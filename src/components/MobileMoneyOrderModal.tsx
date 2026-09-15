import React, { useState, useMemo } from 'react';
import { Book, PaymentMethod, OrderReceipt } from '../types';
import { CONTACT_INFO } from '../data/books';
import { sha256, generateSecureToken, generateLicenseKey, sanitizeInput } from '../lib/crypto';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Copy,
  Check,
  Lock,
  ArrowRight,
  FileText,
  Download,
  History,
  Search,
  Filter,
  CreditCard,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileMoneyOrderModalProps {
  book: Book | null;
  onClose: () => void;
  onOrderCompleted: (receipt: OrderReceipt) => void;
  onSecurityEvent: (event: string, details: string) => void;
  userOrders?: OrderReceipt[];
}

export const MobileMoneyOrderModal: React.FC<MobileMoneyOrderModalProps> = ({
  book,
  onClose,
  onOrderCompleted,
  onSecurityEvent,
  userOrders: initialUserOrders,
}) => {
  // Modal Mode: 'order' or 'history'
  const [activeTab, setActiveTab] = useState<'order' | 'history'>('order');

  // Order steps
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation' | 'success'>('details');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+242 ');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('AIRTEL_MONEY');
  const [transactionRef, setTransactionRef] = useState('');
  const [generatedRef] = useState(() => generateSecureToken('REF', 8));
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);
  const [finalReceipt, setFinalReceipt] = useState<OrderReceipt | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // History filtering state
  const [historyOperatorFilter, setHistoryOperatorFilter] = useState<'ALL' | PaymentMethod>('AIRTEL_MONEY');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  // Retrieve current order receipts from props or local storage
  const currentOrders: OrderReceipt[] = useMemo(() => {
    if (initialUserOrders && initialUserOrders.length > 0) {
      return initialUserOrders;
    }
    const saved = localStorage.getItem('eo_user_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  }, [initialUserOrders]);

  if (!book) return null;

  const currentRecipientPhone =
    paymentMethod === 'MTN_MOMO' ? CONTACT_INFO.mtnMomoDisplay : CONTACT_INFO.airtelMoneyDisplay;
  const currentRecipientTel =
    paymentMethod === 'MTN_MOMO' ? CONTACT_INFO.mtnMomoTel : CONTACT_INFO.airtelMoneyTel;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(currentRecipientPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTxId(id);
    setTimeout(() => setCopiedTxId(null), 2000);
  };

  const handleDownloadReceipt = (receipt: OrderReceipt) => {
    const text = `========================================
REÇU OFFICIEL DE PAIEMENT ENCRE & OMBRE
Plateforme d'Édition Littéraire Sécurisée
========================================
ID Commande      : ${receipt.id}
Titre de l'Œuvre : ${receipt.bookTitle}
Montant Réglé    : ${receipt.amountFcfa.toLocaleString('fr-FR')} FCFA
Opérateur        : ${receipt.paymentMethod === 'AIRTEL_MONEY' ? 'Airtel Money Congo' : 'MTN Mobile Money Congo'}
Réf. Transaction : ${receipt.transactionRef}
Compte Émetteur  : ${receipt.buyerPhone} (${receipt.buyerName})
Compte Récepteur : ${receipt.recipientPhone}
Date & Heure     : ${new Date(receipt.timestamp).toLocaleString('fr-FR')}
Statut           : ${receipt.status} (Scellé par Empreinte SHA-256)
----------------------------------------
CLÉ DE LICENCE NUMÉRIQUE :
${receipt.digitalLicenseKey}
----------------------------------------
EMPREINTE NUMÉRIQUE SHA-256 :
${receipt.sha256Checksum}
========================================
Conservez précieusement ce reçu pour votre espace lecteur.`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Recu-${receipt.paymentMethod}-${receipt.id}.txt`;
    link.click();
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || buyerPhone.trim().length < 6) {
      setErrorMsg('Veuillez renseigner votre nom et un numéro de téléphone valide.');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      setErrorMsg('Veuillez renseigner la référence ou le numéro de transaction reçu par SMS.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const sanitizedName = sanitizeInput(buyerName);
      const sanitizedPhone = sanitizeInput(buyerPhone);
      const sanitizedEmail = sanitizeInput(buyerEmail);
      const sanitizedTx = sanitizeInput(transactionRef);

      const timestamp = new Date().toISOString();
      const digitalLicenseKey = await generateLicenseKey(book.id, sanitizedPhone);

      // Calcul d'intégrité cryptographique SHA-256 du reçu
      const rawReceiptString = `${book.id}|${book.priceFcfa}|${paymentMethod}|${sanitizedTx}|${digitalLicenseKey}|${timestamp}`;
      const sha256Checksum = await sha256(rawReceiptString);

      const receipt: OrderReceipt = {
        id: generateSecureToken('ORD', 10),
        bookId: book.id,
        bookTitle: book.title,
        amountFcfa: book.priceFcfa,
        paymentMethod,
        recipientPhone: currentRecipientPhone,
        buyerName: sanitizedName,
        buyerPhone: sanitizedPhone,
        buyerEmail: sanitizedEmail,
        transactionRef: sanitizedTx,
        timestamp,
        sha256Checksum,
        digitalLicenseKey,
        status: 'VALIDATED',
      };

      setFinalReceipt(receipt);
      onOrderCompleted(receipt);
      onSecurityEvent(
        'ORDER_CREATED',
        `Commande validée: "${book.title}" via ${paymentMethod} (${book.priceFcfa} FCFA) - Réf: ${sanitizedTx}`
      );

      // Notification propriétaire après validation de la commande/paiement.
      fetch('/api/notify-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Achat / soutien',
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          plan: book.title,
          amountFcfa: book.priceFcfa,
          status: receipt.status,
          paymentMethod,
          reference: sanitizedTx,
          timestamp,
        }),
      }).catch(() => {
        // Ne bloque pas la validation locale si l'e-mail ne peut pas partir.
      });

      setStep('success');
    } catch (err) {
      setErrorMsg('Erreur lors de la validation cryptographique de la transaction.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtered orders for transaction history view
  const filteredOrders = useMemo(() => {
    return currentOrders.filter(order => {
      const matchOperator =
        historyOperatorFilter === 'ALL' ? true : order.paymentMethod === historyOperatorFilter;

      if (!matchOperator) return false;

      if (!historySearchQuery.trim()) return true;
      const q = historySearchQuery.toLowerCase();
      return (
        order.bookTitle.toLowerCase().includes(q) ||
        order.transactionRef.toLowerCase().includes(q) ||
        order.buyerPhone.toLowerCase().includes(q) ||
        order.id.toLowerCase().includes(q)
      );
    });
  }, [currentOrders, historyOperatorFilter, historySearchQuery]);

  const airtelOrdersCount = currentOrders.filter(o => o.paymentMethod === 'AIRTEL_MONEY').length;
  const momoOrdersCount = currentOrders.filter(o => o.paymentMethod === 'MTN_MOMO').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#13111a] border border-[#c9a84c]/30 rounded-2xl max-w-2xl w-full text-[#f0ead8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#3d3854]/40 flex items-center justify-between bg-[#1e1b28]/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#f0ead8] flex items-center gap-2">
                <span>Paiement Mobile Money Sécurisé</span>
                {paymentMethod === 'AIRTEL_MONEY' && activeTab === 'order' && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300">
                    Airtel Money
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#8a8699]">
                {book.title} • {book.priceFcfa.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[#3d3854]/30 hover:bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex border-b border-[#3d3854]/40 bg-[#171422] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'order'
                ? 'border-[#c9a84c] text-[#c9a84c] bg-[#1e1b28]'
                : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Passer Commande</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'history'
                ? 'border-[#c9a84c] text-[#c9a84c] bg-[#1e1b28]'
                : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historique des Transactions</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                currentOrders.length > 0 ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold' : 'bg-[#3d3854]/40 text-[#8a8699]'
              }`}
            >
              {currentOrders.length}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && activeTab === 'order' && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 1: ORDER FLOW */}
          {/* ============================================================ */}
          {activeTab === 'order' && (
            <>
              {/* STEP 1: Details */}
              {step === 'details' && (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#1e1b28] border border-[#3d3854]/40 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[#8a8699] block">Ouvrage sélectionné</span>
                      <span className="font-serif font-bold text-sm text-[#f0ead8]">{book.title}</span>
                      <span className="text-[11px] text-[#c9a84c] block">{book.badgeLabel}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#8a8699] block">Montant à régler</span>
                      <span className="font-serif font-black text-base text-[#c9a84c]">
                        {book.priceFcfa.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1.5">
                      Votre Nom &amp; Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Paul Ngoma"
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm text-[#f0ead8] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1.5">
                      Votre Numéro Mobile Money *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+242 06... ou +242 05..."
                      value={buyerPhone}
                      onChange={e => setBuyerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm font-mono text-[#f0ead8] outline-none transition-colors"
                    />
                    <p className="text-[11px] text-[#8a8699] mt-1">
                      Numéro qui sera associé à votre clé de licence numérique sécurisée.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1.5">
                      Adresse Email pour le reçu numérique (optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="lecteur@exemple.com"
                      value={buyerEmail}
                      onChange={e => setBuyerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm text-[#f0ead8] outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    {currentOrders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('history')}
                        className="text-xs text-[#8a8699] hover:text-[#c9a84c] flex items-center gap-1.5 underline cursor-pointer"
                      >
                        <History className="w-3.5 h-3.5" />
                        <span>Voir mes paiements passés ({currentOrders.length})</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer ml-auto"
                    >
                      <span>Passer au paiement</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Mobile Money Instructions */}
              {step === 'payment' && (
                <div className="space-y-5">
                  <div className="text-xs text-[#8a8699]">
                    Choisissez votre opérateur mobile du Congo pour effectuer le virement sécurisé :
                  </div>

                  {/* Operator Selectors */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('AIRTEL_MONEY')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        paymentMethod === 'AIRTEL_MONEY'
                          ? 'border-red-400 bg-red-950/30 text-[#f0ead8] shadow-lg shadow-red-950/40'
                          : 'border-[#3d3854]/40 bg-[#1e1b28] text-[#8a8699] hover:border-red-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">❤️</span>
                          <strong className="text-sm font-serif block text-[#f0ead8]">Airtel Money</strong>
                        </div>
                        {paymentMethod === 'AIRTEL_MONEY' && (
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs font-mono text-red-300 font-bold block">
                        {CONTACT_INFO.airtelMoneyDisplay}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-[#8a8699]">
                        <span>Syntaxe: *128#</span>
                        <span className="text-red-400 font-medium">Recommandé</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('MTN_MOMO')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        paymentMethod === 'MTN_MOMO'
                          ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f0ead8] shadow-lg shadow-[#c9a84c]/10'
                          : 'border-[#3d3854]/40 bg-[#1e1b28] text-[#8a8699] hover:border-[#c9a84c]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💛</span>
                          <strong className="text-sm font-serif block text-[#f0ead8]">MTN MoMo</strong>
                        </div>
                        {paymentMethod === 'MTN_MOMO' && (
                          <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#c9a84c] font-bold block">
                        {CONTACT_INFO.mtnMomoDisplay}
                      </span>
                      <span className="text-[10px] text-[#8a8699] block mt-1">Syntaxe: *105#</span>
                    </button>
                  </div>

                  {/* Operator-Specific Quick History Link */}
                  {paymentMethod === 'AIRTEL_MONEY' && airtelOrdersCount > 0 && (
                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-red-300">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span>Vous avez {airtelOrdersCount} transaction(s) Airtel Money enregistrée(s).</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setHistoryOperatorFilter('AIRTEL_MONEY');
                          setActiveTab('history');
                        }}
                        className="text-xs font-semibold text-red-300 hover:text-white underline cursor-pointer"
                      >
                        Consulter l'historique
                      </button>
                    </div>
                  )}

                  {/* Step instructions */}
                  <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/20 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8a8699]">
                        Numéro officiel{' '}
                        <strong className="text-[#f0ead8]">
                          {paymentMethod === 'AIRTEL_MONEY' ? 'Airtel Money' : 'MTN MoMo'}
                        </strong>{' '}
                        :
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#f0ead8]">
                          {currentRecipientPhone}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="p-1 text-[#c9a84c] hover:text-[#e8d49a] transition-colors cursor-pointer"
                          title="Copier le numéro"
                        >
                          {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8a8699]">Montant exact :</span>
                      <span className="font-mono font-bold text-sm text-[#c9a84c]">
                        {book.priceFcfa.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8a8699]">Motif / Référence de commande :</span>
                      <span className="font-mono text-xs bg-[#13111a] px-2 py-0.5 rounded text-[#e8d49a]">
                        {generatedRef}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="px-4 py-2 border border-[#3d3854] text-[#8a8699] hover:text-[#f0ead8] text-xs rounded-lg cursor-pointer"
                    >
                      Retour
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('confirmation')}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      <span>J'ai effectué le virement</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Transaction ID Input */}
              {step === 'confirmation' && (
                <form onSubmit={handleConfirmPayment} className="space-y-4">
                  <div className="text-xs text-[#8a8699]">
                    Entrez l'ID ou la référence SMS que vous avez reçue de{' '}
                    <strong className="text-[#f0ead8]">
                      {paymentMethod === 'MTN_MOMO' ? 'MTN MoMo' : 'Airtel Money Congo'}
                    </strong>{' '}
                    pour valider instantanément votre commande :
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1.5">
                      ID de transaction / Réf SMS reçu *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        paymentMethod === 'AIRTEL_MONEY'
                          ? 'Ex: AIRTEL-894321 ou Réf message Airtel'
                          : 'Ex: TX-98432109 ou ID transaction SMS'
                      }
                      value={transactionRef}
                      onChange={e => setTransactionRef(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm font-mono text-[#f0ead8] outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[#1e1b28] border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      L'intégrité de la transaction sera scellée par signature cryptographique SHA-256
                      sur votre reçu et enregistrée dans votre historique.
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="px-4 py-2 border border-[#3d3854] text-[#8a8699] hover:text-[#f0ead8] text-xs rounded-lg cursor-pointer"
                    >
                      Précédent
                    </button>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Scellement en cours...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Valider &amp; Sceller la Commande</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: Success & Official Cryptographic Receipt */}
              {step === 'success' && finalReceipt && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#f0ead8]">
                    Commande Scellée &amp; Enregistrée !
                  </h4>
                  <p className="text-xs text-[#8a8699] max-w-md mx-auto">
                    Votre achat pour « {book.title} » est validé. Votre clé de licence numérique a été
                    générée et liée à votre numéro de téléphone.
                  </p>

                  {/* License Key Card */}
                  <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/40 text-left space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#c9a84c] font-semibold">
                        Clé de Licence Numérique Personnelle
                      </span>
                      <button
                        onClick={() => handleCopyKey(finalReceipt.digitalLicenseKey)}
                        className="inline-flex items-center gap-1 text-xs text-[#e8d49a] hover:text-white cursor-pointer"
                      >
                        {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                    <div className="font-mono text-sm sm:text-base font-bold text-[#f0ead8] bg-[#13111a] px-3 py-2 rounded border border-[#3d3854]/40 break-all">
                      {finalReceipt.digitalLicenseKey}
                    </div>

                    <div className="text-[10px] text-[#8a8699] space-y-1 font-mono pt-2 border-t border-[#3d3854]/30">
                      <div>Réf Commande: {finalReceipt.id}</div>
                      <div>Opérateur: {finalReceipt.paymentMethod === 'AIRTEL_MONEY' ? 'Airtel Money' : 'MTN MoMo'}</div>
                      <div>Réf Virement: {finalReceipt.transactionRef}</div>
                      <div className="truncate">Empreinte SHA-256: {finalReceipt.sha256Checksum}</div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => handleDownloadReceipt(finalReceipt)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1e1b28] border border-[#c9a84c]/40 hover:bg-[#2d293d] text-[#e8d49a] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger le Reçu Certifié</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('history')}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#2d293d] border border-[#3d3854] text-[#f0ead8] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <History className="w-4 h-4 text-[#c9a84c]" />
                      <span>Voir dans l'historique</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Terminer</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================================ */}
          {/* TAB 2: DETAILED TRANSACTION HISTORY (AIRTEL MONEY & MOMO) */}
          {/* ============================================================ */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Filter controls & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Operator filter pills */}
                <div className="flex items-center gap-1.5 p-1 bg-[#1e1b28] rounded-lg border border-[#3d3854]/40 text-xs">
                  <button
                    type="button"
                    onClick={() => setHistoryOperatorFilter('ALL')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      historyOperatorFilter === 'ALL'
                        ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                        : 'text-[#8a8699] hover:text-[#f0ead8]'
                    }`}
                  >
                    Tous ({currentOrders.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setHistoryOperatorFilter('AIRTEL_MONEY')}
                    className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                      historyOperatorFilter === 'AIRTEL_MONEY'
                        ? 'bg-red-700 text-white font-bold'
                        : 'text-[#8a8699] hover:text-red-300'
                    }`}
                  >
                    <span>❤️ Airtel Money</span>
                    <span className="font-mono text-[10px] opacity-80">({airtelOrdersCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHistoryOperatorFilter('MTN_MOMO')}
                    className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                      historyOperatorFilter === 'MTN_MOMO'
                        ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                        : 'text-[#8a8699] hover:text-[#c9a84c]'
                    }`}
                  >
                    <span>💛 MTN MoMo</span>
                    <span className="font-mono text-[10px] opacity-80">({momoOrdersCount})</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-[#8a8699] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Rechercher réf, titre, tel..."
                    value={historySearchQuery}
                    onChange={e => setHistorySearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 text-xs text-[#f0ead8] placeholder-[#8a8699] outline-none focus:border-[#c9a84c]"
                  />
                </div>
              </div>

              {/* Transactions List */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-10 px-4 bg-[#1e1b28]/40 border border-[#3d3854]/30 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#3d3854]/20 flex items-center justify-center mx-auto text-[#8a8699]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-sm font-semibold text-[#f0ead8]">
                    {historyOperatorFilter === 'AIRTEL_MONEY'
                      ? 'Aucun paiement Airtel Money trouvé'
                      : historyOperatorFilter === 'MTN_MOMO'
                      ? 'Aucun paiement MTN MoMo trouvé'
                      : 'Aucun historique de transaction'}
                  </h5>
                  <p className="text-xs text-[#8a8699] max-w-sm mx-auto">
                    {historySearchQuery
                      ? 'Aucune transaction ne correspond à votre filtre de recherche.'
                      : 'Les commandes validées par virement Mobile Money apparaîtront ici avec leur reçu cryptographique et leur clé de lecture.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('order')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c9a84c] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider hover:bg-[#e8d49a] transition-colors cursor-pointer mt-2"
                  >
                    <span>Effectuer un paiement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredOrders.map((order, idx) => {
                    const isAirtel = order.paymentMethod === 'AIRTEL_MONEY';
                    const isCopiedTx = copiedTxId === order.id;

                    return (
                      <div
                        key={order.id || idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isAirtel
                            ? 'bg-[#18141f] border-red-900/40 hover:border-red-500/50'
                            : 'bg-[#18141f] border-[#c9a84c]/20 hover:border-[#c9a84c]/50'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2 pb-2 border-b border-[#3d3854]/30">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{isAirtel ? '❤️' : '💛'}</span>
                              <strong className="font-serif text-sm text-[#f0ead8]">
                                {order.bookTitle}
                              </strong>
                            </div>
                            <div className="text-[11px] text-[#8a8699] font-mono mt-0.5">
                              ID: {order.id} • {new Date(order.timestamp).toLocaleString('fr-FR')}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{order.status || 'VALIDÉ'}</span>
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isAirtel
                                  ? 'bg-red-950/70 text-red-300 border border-red-800/40'
                                  : 'bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/40'
                              }`}
                            >
                              {isAirtel ? 'Airtel Money' : 'MTN MoMo'}
                            </span>
                          </div>
                        </div>

                        {/* Card Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                          <div className="p-2 rounded bg-[#13111a] border border-[#3d3854]/20">
                            <span className="text-[10px] uppercase text-[#8a8699] block">
                              Montant Réglé
                            </span>
                            <span className="font-mono font-bold text-sm text-[#c9a84c]">
                              {order.amountFcfa.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>

                          <div className="p-2 rounded bg-[#13111a] border border-[#3d3854]/20">
                            <span className="text-[10px] uppercase text-[#8a8699] block">
                              Référence Virement SMS
                            </span>
                            <span className="font-mono font-bold text-xs text-[#f0ead8] break-all">
                              {order.transactionRef}
                            </span>
                          </div>

                          <div className="p-2 rounded bg-[#13111a] border border-[#3d3854]/20">
                            <span className="text-[10px] uppercase text-[#8a8699] block">
                              Compte Payeur
                            </span>
                            <span className="font-mono text-xs text-[#e8d49a]">
                              {order.buyerPhone} ({order.buyerName})
                            </span>
                          </div>

                          <div className="p-2 rounded bg-[#13111a] border border-[#3d3854]/20">
                            <span className="text-[10px] uppercase text-[#8a8699] block">
                              Compte Récepteur Officiel
                            </span>
                            <span className="font-mono text-xs text-[#f0ead8]">
                              {order.recipientPhone}
                            </span>
                          </div>
                        </div>

                        {/* License Key & Cryptographic Hash */}
                        <div className="p-2.5 rounded bg-[#13111a] border border-[#3d3854]/30 space-y-1.5 mb-3">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#c9a84c] font-semibold flex items-center gap-1">
                              <Lock className="w-3 h-3 text-[#c9a84c]" />
                              <span>Clé de Licence Numérique :</span>
                            </span>
                            <button
                              onClick={() => handleCopyText(order.digitalLicenseKey, order.id)}
                              className="text-[10px] text-[#e8d49a] hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                            >
                              {isCopiedTx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopiedTx ? 'Copié !' : 'Copier'}</span>
                            </button>
                          </div>
                          <div className="font-mono text-xs text-[#f0ead8] font-bold break-all bg-[#0c0b0f] p-1.5 rounded border border-[#3d3854]/20">
                            {order.digitalLicenseKey}
                          </div>
                          <div className="text-[10px] font-mono text-[#8a8699] truncate">
                            Empreinte SHA-256 : {order.sha256Checksum}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDownloadReceipt(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e1b28] hover:bg-[#2d293d] border border-[#c9a84c]/30 text-xs text-[#e8d49a] transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Télécharger le reçu (.txt)</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
