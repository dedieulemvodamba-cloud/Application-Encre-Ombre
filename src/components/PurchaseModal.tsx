import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, Loader2, KeyRound, Copy, Check, Search } from 'lucide-react';
import { Story, DEFAULT_PRICE_FCFA } from '../data/stories';
import { sendNotificationEmail } from '../lib/email';
import { redeemCode, syncUnlocksFromPhone } from '../lib/purchases';
import { createOrder } from '../lib/orders';

interface PurchaseModalProps {
  story: Story;
  onClose: () => void;
  onUnlocked: () => void;
  initialStep?: 'pay' | 'restore';
}

// Numéro(s) Mobile Money à afficher aux acheteurs.
// Ajoute Airtel Money ici de la même façon dès que tu as le numéro.
const MOBILE_MONEY_OPTIONS = [
  {
    id: 'mtn',
    label: 'MTN Mobile Money',
    number: '06 973 83 88',
    holder: 'Aimé Patrick',
  },
];

type Step = 'pay' | 'sent' | 'code' | 'restore';
type SendStatus = 'idle' | 'sending' | 'sent' | 'error';
type RestoreStatus = 'idle' | 'searching' | 'found' | 'not-found' | 'error';

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ story, onClose, onUnlocked, initialStep = 'pay' }) => {
  const [step, setStep] = useState<Step>(initialStep);
  const [selectedMethod, setSelectedMethod] = useState(MOBILE_MONEY_OPTIONS[0]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [copied, setCopied] = useState(false);

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const [restorePhone, setRestorePhone] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<RestoreStatus>('idle');

  const price = story.price ?? DEFAULT_PRICE_FCFA;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(selectedMethod.number.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || sendStatus === 'sending') return;

    setSendStatus('sending');
    try {
      await createOrder({
        storyId: story.id,
        storyTitle: story.title,
        buyerName: buyerName.trim(),
        buyerPhone: buyerPhone.trim(),
        price,
        method: selectedMethod.label,
      });
      await sendNotificationEmail({
        subject: `Transaction en cours — ${story.title}`,
        user_email: buyerPhone.trim(),
        message:
          `Une transaction est en cours de vérification.\n\n` +
          `Livre : ${story.title}\n` +
          `Prix : ${price} FCFA\n` +
          `Méthode : ${selectedMethod.label}\n\n` +
          `Nom de l'acheteur : ${buyerName.trim()}\n` +
          `Téléphone de l'acheteur : ${buyerPhone.trim()}\n\n` +
          `Vérifie la réception du paiement sur ton compte ${selectedMethod.label}, ` +
          `puis envoie le code de déverrouillage à l'acheteur (Espace auteur, en bas du site).`,
      });
      setSendStatus('sent');
      setStep('sent');
    } catch (err) {
      console.error('Erreur envoi notification de commande :', err);
      setSendStatus('error');
    }
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = redeemCode(story.id, code);
    if (ok) {
      onUnlocked();
      onClose();
    } else {
      setCodeError(true);
    }
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restorePhone.trim() || restoreStatus === 'searching') return;
    setRestoreStatus('searching');
    try {
      const unlockedIds = await syncUnlocksFromPhone(restorePhone.trim());
      if (unlockedIds.includes(story.id)) {
        setRestoreStatus('found');
        onUnlocked();
        setTimeout(() => onClose(), 1200);
      } else {
        setRestoreStatus('not-found');
      }
    } catch (err) {
      console.error('Erreur récupération achats :', err);
      setRestoreStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1c1930] border border-[#c9a24b]/25 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/20 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-[#f3e8d0]" />
        </button>

        <h3
          className="text-xl text-[#f3e8d0] mb-1 pr-8"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {story.title}
        </h3>

        {step === 'pay' && (
          <>
            <p className="text-sm text-[#a9a4b8] mb-6">
              Débloquez le livre complet pour{' '}
              <span className="text-[#dcc074] font-semibold">{price} FCFA</span>
            </p>

            {MOBILE_MONEY_OPTIONS.length > 1 && (
              <div className="flex gap-2 mb-4">
                {MOBILE_MONEY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedMethod(opt)}
                    className={`flex-1 text-xs py-2 rounded border transition-colors ${
                      selectedMethod.id === opt.id
                        ? 'border-[#c9a24b] text-[#dcc074] bg-[#c9a24b]/10'
                        : 'border-[#c9a24b]/20 text-[#a9a4b8]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-[#c9a24b]/25 bg-[#14121b] p-4 mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c9a24b] mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                <span>{selectedMethod.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-mono text-[#f3e8d0]">{selectedMethod.number}</p>
                  <p className="text-xs text-[#7c778f]">{selectedMethod.holder}</p>
                </div>
                <button
                  onClick={handleCopyNumber}
                  className="p-2 rounded border border-[#c9a24b]/25 hover:border-[#c9a24b] transition-colors"
                  title="Copier le numéro"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#dcc074]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#a9a4b8]" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-[#7c778f] mb-5">
              1. Envoyez {price} FCFA au numéro ci-dessus.
              <br />
              2. Remplissez vos informations ci-dessous et confirmez.
              <br />
              3. Vous recevrez un code de déverrouillage par SMS/WhatsApp après vérification.
            </p>

            <form onSubmit={handleConfirmPayment} className="space-y-3">
              <input
                type="text"
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] placeholder:text-[#7c778f] text-sm focus:outline-none focus:border-[#c9a24b]"
              />
              <input
                type="tel"
                required
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="Votre numéro de téléphone"
                className="w-full px-4 py-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] placeholder:text-[#7c778f] text-sm focus:outline-none focus:border-[#c9a24b]"
              />
              <button
                type="submit"
                disabled={sendStatus === 'sending'}
                className="w-full py-3 rounded bg-[#c9a24b] text-[#14121b] text-sm font-semibold uppercase tracking-wider hover:bg-[#dcc074] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {sendStatus === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Envoi…</span>
                  </>
                ) : (
                  <span>J'ai effectué le paiement</span>
                )}
              </button>
              {sendStatus === 'error' && (
                <p className="text-xs text-[#7a2331] text-center">
                  L'envoi a échoué. Vérifie ta connexion et réessaie.
                </p>
              )}
            </form>

            <button
              onClick={() => setStep('restore')}
              className="w-full text-center text-xs text-[#a9a4b8] hover:text-[#dcc074] mt-5 underline underline-offset-4"
            >
              J'ai déjà payé sur un autre appareil — retrouver mon livre
            </button>
          </>
        )}

        {step === 'sent' && (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-[#dcc074]" />
            <p className="text-[#f3e8d0] font-medium mb-2">Transaction en cours de vérification</p>
            <p className="text-sm text-[#a9a4b8] mb-6">
              L'auteur va vérifier la réception du paiement. Une fois validé, retrouvez votre livre
              directement avec votre numéro de téléphone, sur n'importe quel appareil.
            </p>
            <button
              onClick={() => setStep('restore')}
              className="text-xs text-[#dcc074] underline underline-offset-4"
            >
              Vérifier si mon achat a été validé
            </button>
          </div>
        )}

        {step === 'code' && (
          <form onSubmit={handleRedeem} className="py-2">
            <KeyRound className="w-8 h-8 mx-auto mb-4 text-[#c9a24b] opacity-80" />
            <p className="text-sm text-[#a9a4b8] text-center mb-5">
              Entrez le code reçu par SMS ou WhatsApp pour débloquer ce livre.
            </p>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError(false);
              }}
              placeholder="Code de déverrouillage"
              className="w-full px-4 py-3 mb-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] text-center tracking-[0.3em] uppercase placeholder:tracking-normal placeholder:text-[#7c778f] text-sm focus:outline-none focus:border-[#c9a24b]"
            />
            {codeError && (
              <p className="text-xs text-[#7a2331] text-center mb-3">
                Code invalide. Vérifiez-le ou contactez l'auteur via la section Contact.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded bg-[#c9a24b] text-[#14121b] text-sm font-semibold uppercase tracking-wider hover:bg-[#dcc074] transition-colors"
            >
              Déverrouiller
            </button>
            <button
              type="button"
              onClick={() => setStep('pay')}
              className="w-full text-center text-xs text-[#a9a4b8] hover:text-[#dcc074] mt-4 underline underline-offset-4"
            >
              Retour au paiement
            </button>
          </form>
        )}

        {step === 'restore' && (
          <form onSubmit={handleRestore} className="py-2">
            <Search className="w-8 h-8 mx-auto mb-4 text-[#c9a24b] opacity-80" />
            <p className="text-sm text-[#a9a4b8] text-center mb-5">
              Entrez le numéro de téléphone utilisé lors de l'achat pour retrouver ce livre,
              sur n'importe quel appareil.
            </p>
            <input
              type="tel"
              required
              value={restorePhone}
              onChange={(e) => {
                setRestorePhone(e.target.value);
                setRestoreStatus('idle');
              }}
              placeholder="Votre numéro de téléphone"
              className="w-full px-4 py-3 mb-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] text-sm focus:outline-none focus:border-[#c9a24b]"
            />

            {restoreStatus === 'found' && (
              <p className="text-xs text-[#dcc074] text-center mb-3 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Livre retrouvé et débloqué !</span>
              </p>
            )}
            {restoreStatus === 'not-found' && (
              <p className="text-xs text-[#7a2331] text-center mb-3">
                Aucun achat validé pour ce numéro et ce livre. Si vous venez de payer, l'auteur n'a
                peut-être pas encore vérifié la transaction — réessayez un peu plus tard.
              </p>
            )}
            {restoreStatus === 'error' && (
              <p className="text-xs text-[#7a2331] text-center mb-3">
                La recherche a échoué. Vérifiez votre connexion et réessayez.
              </p>
            )}

            <button
              type="submit"
              disabled={restoreStatus === 'searching'}
              className="w-full py-3 rounded bg-[#c9a24b] text-[#14121b] text-sm font-semibold uppercase tracking-wider hover:bg-[#dcc074] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {restoreStatus === 'searching' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Recherche…</span>
                </>
              ) : (
                <span>Retrouver mon livre</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep('code')}
              className="w-full text-center text-xs text-[#a9a4b8] hover:text-[#dcc074] mt-4 underline underline-offset-4"
            >
              J'ai plutôt un code de déverrouillage
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
