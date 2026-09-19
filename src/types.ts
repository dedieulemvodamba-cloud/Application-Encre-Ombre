export type BookGenreBadge = 'roman' | 'bd' | 'doc' | 'sacre' | 'jeunesse' | 'horreur';

export interface Chapter {
  number: number;
  title: string;
  content: string[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  badge: BookGenreBadge;
  badgeLabel: string;
  description: string;
  priceFcfa: number;
  priceEur: number;
  tags: string[];
  chapters: Chapter[];
  isbnCode: string;
  rating: number;
  coverImage?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'reader' | 'vip' | 'author';
  registeredAt: string;
  sessionToken: string;
  twoFactorEnabled: boolean;
}

export type SecurityEventSeverity = 'info' | 'warn' | 'critical';

export interface SecurityAuditItem {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  severity: SecurityEventSeverity;
  hash: string;
}

export type PaymentMethod = 'MTN_MOMO' | 'AIRTEL_MONEY';

export interface OrderReceipt {
  id: string;
  bookId: string;
  bookTitle: string;
  amountFcfa: number;
  paymentMethod: PaymentMethod;
  recipientPhone: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  transactionRef: string;
  timestamp: string;
  sha256Checksum: string;
  digitalLicenseKey: string;
  status: 'PENDING_VERIFICATION' | 'VALIDATED';
}

export interface EncryptedNote {
  id: string;
  title: string;
  ciphertext: string;
  iv: string;
  updatedAt: string;
  decryptedPreview?: string;
}
