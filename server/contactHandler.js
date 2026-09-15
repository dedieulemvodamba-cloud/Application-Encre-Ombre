import 'dotenv/config';

// ============================================================
// Contact Handler - Backend API Route: POST /api/contact
// Envoi sécurisé des messages abonnés vers le Webhook Google Apps Script
// ============================================================

// Cache mémoire pour la limitation par adresse IP (Anti-Spam)
const ipRequestHistory = new Map();

// Nettoyage périodique du cache anti-spam (toutes les 15 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestHistory.entries()) {
    if (now - record.firstRequest > 10 * 60 * 1000) {
      ipRequestHistory.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Nettoyage des chaînes de caractères pour prévenir les failles XSS et injections
 */
export function sanitizeString(val, maxLength = 5000) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[<>]/g, '') // Supprime les balises HTML strictes
    .trim()
    .slice(0, maxLength);
}

/**
 * Validation basique du format email RFC 5322
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Envoi de secours via Resend vers l'adresse CONTACT_EMAIL si le webhook est indisponible ou non autorisé
 */
async function sendViaResendFallback({ name, email, subject, message, contactEmail }) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return false;

    const rawFrom = process.env.MAIL_FROM;
    const fromAddress = (rawFrom && rawFrom.includes('@')) ? rawFrom : 'Encre & Ombre <onboarding@resend.dev>';
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [contactEmail],
        reply_to: email,
        subject: `[Encre & Ombre] Message de ${name} : ${subject}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0c0b0f; color: #f0ead8; border: 1px solid #c9a84c;">
            <h2 style="color: #c9a84c; border-bottom: 1px solid #c9a84c; padding-bottom: 10px;">Encre &amp; Ombre — Nouveau message d'un lecteur</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email de l'expéditeur :</strong> <a href="mailto:${email}" style="color: #e8d49a;">${email}</a></p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #3d3854; margin: 20px 0;"/>
            <p><strong>Message :</strong></p>
            <div style="background: #1e1b28; padding: 15px; border-radius: 6px; border: 1px solid #3d3854; font-family: sans-serif; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            <p style="margin-top: 20px; font-size: 11px; color: #8a8699;">Transmis de manière sécurisée par Encre &amp; Ombre vers ${contactEmail}</p>
          </div>
        `,
      }),
    });

    if (resp.ok) {
      console.log(`[Contact API] Message transmis via secours Resend vers ${contactEmail}`);
      return true;
    }
    const errText = await resp.text();
    console.warn('[Contact API] Échec du secours Resend:', errText);
    return false;
  } catch (err) {
    console.error('[Contact API] Exception dans sendViaResendFallback:', err);
    return false;
  }
}

/**
 * Traitement principal de la requête de contact
 * @param {Object} data - Données du formulaire ({ name, email, subject, message, website })
 * @param {string} clientIp - Adresse IP du client
 * @returns {Promise<{ status: number, body: Object }>}
 */
export async function processContactMessage(data, clientIp = '127.0.0.1') {
  const now = Date.now();

  // 1. PROTECTION ANTI-SPAM : Honeypot "website"
  // Si le champ invisible "website" est rempli, un bot a soumis le formulaire.
  // On refuse silencieusement en retournant un succès simulé sans appeler le webhook.
  if (data.website && String(data.website).trim().length > 0) {
    console.warn(`[Anti-Spam] Honeypot déclenché par l'IP ${clientIp}. Rejet silencieux.`);
    return {
      status: 200,
      body: { ok: true, message: 'Message envoyé avec succès' },
    };
  }

  // 2. PROTECTION ANTI-SPAM : Cooldown & Limitation de débit par IP
  const record = ipRequestHistory.get(clientIp);
  if (record) {
    // Empêcher les envois trop rapides (délai minimal de 4 secondes entre deux envois)
    const timeSinceLast = now - record.lastSent;
    if (timeSinceLast < 4000) {
      return {
        status: 400,
        body: {
          ok: false,
          error: 'Veuillez patienter quelques secondes avant de renvoyer un message.',
        },
      };
    }

    // Limiter le nombre d'envois (maximum 5 messages par tranche de 10 minutes)
    if (now - record.firstRequest < 10 * 60 * 1000) {
      if (record.count >= 5) {
        return {
          status: 400,
          body: {
            ok: false,
            error: 'Trop de messages envoyés depuis votre connexion. Veuillez réessayer dans quelques minutes.',
          },
        };
      }
      record.count += 1;
      record.lastSent = now;
    } else {
      // Réinitialiser la période
      ipRequestHistory.set(clientIp, { firstRequest: now, lastSent: now, count: 1 });
    }
  } else {
    ipRequestHistory.set(clientIp, { firstRequest: now, lastSent: now, count: 1 });
  }

  // 3. VALIDATION CÔTÉ SERVEUR DES DONNÉES REÇUES
  const rawName = data.name;
  const rawEmail = data.email;
  const rawSubject = data.subject;
  const rawMessage = data.message;

  // Vérification de la présence des champs obligatoires
  if (!rawName || typeof rawName !== 'string' || !rawName.trim()) {
    return {
      status: 400,
      body: { ok: false, error: 'Le nom de l’abonné est obligatoire.' },
    };
  }

  if (!rawEmail || typeof rawEmail !== 'string' || !isValidEmail(rawEmail)) {
    return {
      status: 400,
      body: { ok: false, error: 'Une adresse email valide est obligatoire.' },
    };
  }

  if (!rawSubject || typeof rawSubject !== 'string' || !rawSubject.trim()) {
    return {
      status: 400,
      body: { ok: false, error: 'Le sujet du message est obligatoire.' },
    };
  }

  if (!rawMessage || typeof rawMessage !== 'string' || rawMessage.trim().length < 5) {
    return {
      status: 400,
      body: { ok: false, error: 'Le message doit comporter au moins 5 caractères.' },
    };
  }

  if (rawMessage.length > 5000) {
    return {
      status: 400,
      body: { ok: false, error: 'Le message ne peut pas dépasser 5000 caractères.' },
    };
  }

  // 4. NETTOYAGE ET CONTRÔLE DES LONGUEURS MAXIMALES
  const name = sanitizeString(rawName, 150);
  const email = rawEmail.trim().toLowerCase().slice(0, 254);
  const subject = sanitizeString(rawSubject, 200);
  const message = sanitizeString(rawMessage, 5000);

  // 5. ENVOI AU WEBHOOK GOOGLE APPS SCRIPT
  const webhookUrl =
    process.env.EMAIL_WEBHOOK_URL ||
    'https://script.google.com/macros/s/AKfycbx_cQSY5JrRjcgMoOyGEmL8R3RInU4yJAuMgI2NCFZIo_A6IB_uYhn_4MpN2Pe2Dulq/exec';
  const contactEmail = process.env.CONTACT_EMAIL || 'dedieulemvodamba@gmail.com';

  if (!webhookUrl) {
    console.warn(
      `[Contact API] EMAIL_WEBHOOK_URL non configurée dans l'environnement. Destinataire prévu : ${contactEmail}`
    );
    if (process.env.RESEND_API_KEY) {
      console.log(`[Contact API] Utilisation directe de Resend vers ${contactEmail}...`);
      const fallbackSuccess = await sendViaResendFallback({ name, email, subject, message, contactEmail });
      if (fallbackSuccess) {
        return {
          status: 200,
          body: { ok: true, message: 'Message envoyé avec succès' },
        };
      }
    }
    return {
      status: 500,
      body: {
        ok: false,
        error: "Le service d'envoi d'e-mail (EMAIL_WEBHOOK_URL) n'est pas encore configuré sur le serveur.",
      },
    };
  }

  // Structure JSON stricte requise pour le webhook Google Apps Script
  const webhookPayload = {
    name,
    email,
    subject,
    message,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 secondes max

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify(webhookPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!webhookResponse.ok) {
      console.error(
        `[Webhook Error] Google Apps Script returned HTTP ${webhookResponse.status}`
      );

      // Système de secours haute disponibilité : Si le webhook Google Apps Script renvoie une erreur (ex: 403 restriction de droits),
      // et que RESEND_API_KEY est configurée, nous transmettons directement l'e-mail à CONTACT_EMAIL pour garantir zéro perte de message.
      if (process.env.RESEND_API_KEY) {
        console.log(`[Contact API] Tentative de secours via Resend vers ${contactEmail}...`);
        const fallbackSuccess = await sendViaResendFallback({ name, email, subject, message, contactEmail });
        if (fallbackSuccess) {
          return {
            status: 200,
            body: { ok: true, message: 'Message envoyé avec succès' },
          };
        }
      }

      return {
        status: 500,
        body: {
          ok: false,
          error: `Erreur du serveur d'envoi (Code ${webhookResponse.status}). Vérifiez les autorisations Google Apps Script.`,
        },
      };
    }

    // Le webhook peut répondre du texte ou du JSON
    const responseText = await webhookResponse.text();

    // Détection si Google Apps Script a retourné une page d'erreur (ex: doPost manquant)
    const isGasError =
      responseText.includes('Script-Funktion nicht gefunden') ||
      responseText.includes('Script function not found') ||
      responseText.includes('errorMessage') ||
      (responseText.startsWith('<!DOCTYPE html>') && !responseText.includes('"ok":true'));

    if (isGasError) {
      console.warn(
        '[Webhook Warning] Le webhook Google Apps Script a répondu avec une erreur (ex: doPost non trouvé dans le script).'
      );
      if (process.env.RESEND_API_KEY) {
        console.log(`[Contact API] Déclenchement automatique du secours Resend vers ${contactEmail}...`);
        const fallbackSuccess = await sendViaResendFallback({ name, email, subject, message, contactEmail });
        if (fallbackSuccess) {
          return {
            status: 200,
            body: { ok: true, message: 'Message envoyé avec succès' },
          };
        }
      }
    }

    console.log(`[Contact API] Message envoyé avec succès via webhook à ${contactEmail}`);

    return {
      status: 200,
      body: {
        ok: true,
        message: 'Message envoyé avec succès',
      },
    };
  } catch (err) {
    console.error('[Network Error] Erreur de communication avec le webhook :', err);

    if (process.env.RESEND_API_KEY) {
      console.log(`[Contact API] Tentative de secours via Resend suite à incident réseau vers ${contactEmail}...`);
      const fallbackSuccess = await sendViaResendFallback({ name, email, subject, message, contactEmail });
      if (fallbackSuccess) {
        return {
          status: 200,
          body: { ok: true, message: 'Message envoyé avec succès' },
        };
      }
    }

    if (err.name === 'AbortError') {
      return {
        status: 500,
        body: {
          ok: false,
          error: "Délai d'attente dépassé lors de l'envoi du message au serveur e-mail.",
        },
      };
    }

    return {
      status: 500,
      body: {
        ok: false,
        error: "Impossible de joindre le serveur d'envoi d'e-mail. Veuillez vérifier votre connexion et réessayer.",
      },
    };
  }
}
