/**
 * Utilitaires cryptographiques et de sécurité basés sur la Web Crypto API native
 */

// Calcul de hash SHA-256
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Génération de jeton sécurisé aléatoire (CSPRNG)
export function generateSecureToken(prefix = 'EO-SEC', length = 12): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const randomHex = Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .slice(0, length);
  return `${prefix}-${randomHex}`;
}

// Dérivation d'une clé AES-GCM 256 bits à partir d'un mot de passe / phrase secrète
async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Chiffrement AES-GCM 256 bits de données textuelles
export async function encryptWithKey(
  plaintext: string,
  passphrase: string
): Promise<{ ciphertext: string; iv: string }> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  // Combiner salt + données chiffrées
  const combined = new Uint8Array(salt.byteLength + encryptedBuffer.byteLength);
  combined.set(salt, 0);
  combined.set(new Uint8Array(encryptedBuffer), salt.byteLength);

  // Convertir en Hex
  const ciphertextHex = Array.from(combined)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  const ivHex = Array.from(iv)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return { ciphertext: ciphertextHex, iv: ivHex };
}

// Déchiffrement AES-GCM 256 bits
export async function decryptWithKey(
  ciphertextHex: string,
  ivHex: string,
  passphrase: string
): Promise<string> {
  try {
    const rawCipher = new Uint8Array(
      ciphertextHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );
    const iv = new Uint8Array(
      ivHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );

    if (rawCipher.length < 16) {
      throw new Error('Données corrompues');
    }

    const salt = rawCipher.slice(0, 16);
    const encryptedBytes = rawCipher.slice(16);

    const key = await deriveKey(passphrase, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedBytes
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  } catch (err) {
    throw new Error('Mot de passe ou clé invalide pour ce déchiffrement.');
  }
}

// Évaluation de la robustesse du mot de passe
export function evaluatePasswordStrength(password: string): {
  score: number;
  label: string;
  tips: string[];
} {
  const tips: string[] = [];
  let score = 0;

  if (!password) {
    return { score: 0, label: 'Vide', tips: ['Entrez au moins 8 caractères'] };
  }

  if (password.length >= 8) score += 25;
  else tips.push('Au moins 8 caractères');

  if (password.length >= 12) score += 15;

  if (/[A-Z]/.test(password)) score += 20;
  else tips.push('Une lettre majuscule');

  if (/[0-9]/.test(password)) score += 20;
  else tips.push('Au moins un chiffre');

  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  else tips.push('Un symbole spécial (@, #, !, etc.)');

  score = Math.min(100, score);

  let label = 'Faible';
  if (score >= 80) label = 'Très Robuste';
  else if (score >= 60) label = 'Robuste';
  else if (score >= 40) label = 'Moyen';

  return { score, label, tips };
}

// Nettoyage anti-XSS et assainissement des entrées
export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Génération d'une clé de licence signée
export async function generateLicenseKey(bookId: string, phone: string): Promise<string> {
  const raw = `${bookId}:${phone}:${Date.now()}:ENCRE_OMBRE_SECRET`;
  const hash = await sha256(raw);
  return `EO-${bookId.toUpperCase().slice(0, 3)}-${hash.slice(0, 4).toUpperCase()}-${hash.slice(4, 8).toUpperCase()}`;
}
