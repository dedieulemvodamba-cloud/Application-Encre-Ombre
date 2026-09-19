import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface OrderRecord {
  id?: string;
  storyId: string;
  storyTitle: string;
  buyerName: string;
  buyerPhone: string;
  price: number;
  method: string;
  status: 'pending' | 'validated';
  createdAt?: Timestamp;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** Crée une commande "en attente" dans Firestore quand l'acheteur confirme avoir payé. */
export async function createOrder(
  order: Omit<OrderRecord, 'status' | 'createdAt' | 'id'>
): Promise<void> {
  await addDoc(collection(db, 'orders'), {
    ...order,
    buyerPhone: normalizePhone(order.buyerPhone),
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

/** Liste les commandes en attente de vérification, pour l'Espace auteur. */
export async function listPendingOrders(): Promise<OrderRecord[]> {
  const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<OrderRecord, 'id'>) }))
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
}

/** Marque une commande comme validée et débloque le livre pour ce numéro de téléphone. */
export async function validateOrder(order: OrderRecord): Promise<void> {
  if (!order.id) return;
  await updateDoc(doc(db, 'orders', order.id), { status: 'validated' });
  const phone = normalizePhone(order.buyerPhone);
  const unlockId = `${phone}_${order.storyId}`;
  await setDoc(doc(db, 'unlocks', unlockId), {
    phone,
    storyId: order.storyId,
    unlockedAt: serverTimestamp(),
  });
}

/** Renvoie les identifiants de livres débloqués pour un numéro de téléphone donné. */
export async function getUnlockedStoryIds(phone: string): Promise<string[]> {
  const normalized = normalizePhone(phone);
  if (!normalized) return [];
  const q = query(collection(db, 'unlocks'), where('phone', '==', normalized));
  const snap = await getDocs(q);
  return snap.docs.map((d) => (d.data() as { storyId: string }).storyId);
}
