/**
 * Système de déverrouillage "manuel" pour Encre & Ombre.
 *
 * Principe : après avoir vérifié toi-même (sur ton téléphone Mobile Money)
 * qu'un paiement est bien arrivé, tu génères un code pour ce livre depuis
 * l'Espace auteur (voir AdminPanel.tsx), et tu l'envoies à l'acheteur par
 * SMS/WhatsApp. En l'entrant dans l'app, le livre se déverrouille.
 *
 * Le code est calculé à partir de l'identifiant du livre + une clé secrète
 * (SECRET_SALT ci-dessous) : pas besoin de base de données, le même calcul
 * redonne toujours le même code pour un livre donné.
 *
 * ⚠️ Change SECRET_SALT avant de mettre en ligne pour de vrai, et garde-le
 * pour toi : quiconque le connaît peut générer les codes de déverrouillage.
 */

import { getUnlockedStoryIds } from './orders';

const SECRET_SALT = 'EncreOmbre-2026-ChangeMoi';

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase();
}

export function generateUnlockCode(storyId: string): string {
  return simpleHash(`${storyId}::${SECRET_SALT}`).padStart(6, '0').slice(0, 6);
}

const STORAGE_KEY = 'eo_unlocked_stories';

function getUnlockedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isStoryUnlocked(storyId: string): boolean {
  return getUnlockedIds().includes(storyId);
}

export function markUnlocked(storyId: string) {
  const ids = getUnlockedIds();
  if (!ids.includes(storyId)) {
    ids.push(storyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

/**
 * Interroge Firestore pour retrouver les livres achetés et validés pour ce
 * numéro de téléphone (sur n'importe quel appareil), et les enregistre
 * localement pour un accès immédiat.
 */
export async function syncUnlocksFromPhone(phone: string): Promise<string[]> {
  const storyIds = await getUnlockedStoryIds(phone);
  storyIds.forEach(markUnlocked);
  return storyIds;
}

export function redeemCode(storyId: string, inputCode: string): boolean {
  const expected = generateUnlockCode(storyId);
  const normalized = inputCode.trim().toUpperCase().replace(/\s+/g, '');
  if (normalized === expected) {
    markUnlocked(storyId);
    return true;
  }
  return false;
}
