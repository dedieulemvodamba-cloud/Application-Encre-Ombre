import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { processContactMessage } from './server/contactHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);
const OWNER_EMAIL = process.env.CONTACT_EMAIL || 'dedieulemvodamba@gmail.com';

app.use(express.json({ limit: '50kb' }));

function clean(value, max = 300) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

// Route POST /api/contact pour l'envoi des messages abonnés vers le webhook
app.post('/api/contact', async (req, res) => {
  try {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    const result = await processContactMessage(req.body, clientIp);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Contact route internal error:', error);
    return res.status(500).json({ ok: false, error: 'Erreur interne du serveur.' });
  }
});

app.post('/api/notify-subscription', async (req, res) => {
  try {
    const { RESEND_API_KEY, MAIL_FROM } = process.env;
    if (!RESEND_API_KEY) {
      return res.status(503).json({ ok: false, error: 'Service e-mail non configuré.' });
    }

    const type = clean(req.body?.type || 'Nouvel abonnement');
    const name = clean(req.body?.name || 'Non renseigné');
    const email = clean(req.body?.email || 'Non renseigné');
    const phone = clean(req.body?.phone || 'Non renseigné');
    const plan = clean(req.body?.plan || 'Non renseigné');
    const amount = Number(req.body?.amountFcfa || 0);
    const status = clean(req.body?.status || 'INCONNU');
    const paymentMethod = clean(req.body?.paymentMethod || '');
    const reference = clean(req.body?.reference || 'Non renseignée');
    const timestamp = clean(req.body?.timestamp || new Date().toISOString());

    const html = `
      <h2>🔔 Nouvelle activité sur Encre &amp; Ombre</h2>
      <p><strong>Type :</strong> ${type}</p>
      <hr>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>E-mail :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Formule / contenu :</strong> ${plan}</p>
      <p><strong>Montant :</strong> ${amount.toLocaleString('fr-FR')} FCFA</p>
      <p><strong>Statut :</strong> ${status}</p>
      ${paymentMethod ? `<p><strong>Paiement :</strong> ${paymentMethod}</p>` : ''}
      <p><strong>Référence :</strong> ${reference}</p>
      <p><strong>Date :</strong> ${timestamp}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: (MAIL_FROM && MAIL_FROM.includes('@')) ? MAIL_FROM : 'Encre & Ombre <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        subject: `🔔 ${type} — ${plan}`,
        html,
        ...(email.includes('@') ? { reply_to: email } : {}),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend error:', details);
      return res.status(502).json({ ok: false, error: 'Échec de l’envoi e-mail.' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Notification error:', error);
    return res.status(500).json({ ok: false, error: 'Erreur interne.' });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Encre & Ombre server running on port ${PORT}`);
});
