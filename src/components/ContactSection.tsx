import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/books';
import { sanitizeInput } from '../lib/crypto';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Copy,
  Check,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  onSecurityEvent: (event: string, details: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSecurityEvent }) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Honeypot anti-spam (champ invisible nommé "website")
  const [website, setWebsite] = useState('');

  // Submission state
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Clipboard feedback for phone cards
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return 'Le nom de l’abonné est obligatoire.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      return 'Veuillez renseigner une adresse email valide.';
    }
    if (!subject.trim()) {
      return 'Le sujet est obligatoire.';
    }
    if (!message.trim() || message.trim().length < 5) {
      return 'Le message doit contenir au moins 5 caractères.';
    }
    if (message.length > 5000) {
      return 'Le message ne peut pas dépasser 5 000 caractères.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Empêcher les doubles clics
    if (isSending) return;

    // Validation côté client
    const validationError = validateForm();
    if (validationError) {
      setFeedback({
        type: 'error',
        message: validationError,
      });
      return;
    }

    setIsSending(true);
    setFeedback({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizeInput(name),
          email: email.trim(),
          subject: sanitizeInput(subject),
          message: sanitizeInput(message),
          website: website, // Champ honeypot invisible
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        // Message envoyé avec succès
        setFeedback({
          type: 'success',
          message: 'Message envoyé avec succès',
        });

        // Vider le formulaire après succès
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setWebsite('');

        onSecurityEvent(
          'CONTACT_MESSAGE_SENT',
          `Message transmis avec succès pour ${sanitizeInput(name)}`
        );
      } else {
        const errorMsg =
          data.error ||
          (response.status === 400
            ? 'Données invalides. Veuillez vérifier votre saisie.'
            : "Erreur lors de l'envoi du message. Veuillez réessayer ultérieurement.");

        setFeedback({
          type: 'error',
          message: errorMsg,
        });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setFeedback({
        type: 'error',
        message:
          'Impossible de joindre le serveur. Veuillez vérifier votre connexion internet et réessayer.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#1e1b28] relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-[#c9a84c] text-xs uppercase tracking-[0.25em] font-semibold mb-2 opacity-80">
          Nous contacter
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0ead8]">
          Entrer dans l'ombre
        </h2>
        <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto my-4" />
        <p className="text-sm text-[#8a8699] max-w-lg mx-auto leading-relaxed mb-10">
          Une question, une commande littéraire ou un projet de publication ? Écrivez-nous
          directement.
        </p>

        {/* Direct Contact Info Cards (Congo +242) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
          {/* Phone */}
          <div className="p-5 rounded-xl bg-[#2d293d] border border-[#c9a84c]/20 hover:border-[#c9a84c] transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-semibold mb-0.5">
                  Téléphone
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phoneTel}`}
                  className="font-serif font-bold text-sm text-[#f0ead8] group-hover:text-[#c9a84c] transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(CONTACT_INFO.phoneDisplay, 'phone')}
              className="p-1.5 text-[#8a8699] hover:text-[#c9a84c] cursor-pointer"
              title="Copier le numéro"
            >
              {copiedItem === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* MTN MoMo */}
          <div className="p-5 rounded-xl bg-[#2d293d] border border-[#c9a84c]/20 hover:border-[#c9a84c] transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">💛</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-semibold mb-0.5">
                  MTN MoMo
                </p>
                <a
                  href={`tel:${CONTACT_INFO.mtnMomoTel}`}
                  className="font-serif font-bold text-sm text-[#f0ead8] group-hover:text-[#c9a84c] transition-colors"
                >
                  {CONTACT_INFO.mtnMomoDisplay}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(CONTACT_INFO.mtnMomoDisplay, 'momo')}
              className="p-1.5 text-[#8a8699] hover:text-[#c9a84c] cursor-pointer"
              title="Copier le numéro"
            >
              {copiedItem === 'momo' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Airtel Money */}
          <div className="p-5 rounded-xl bg-[#2d293d] border border-[#c9a84c]/20 hover:border-[#c9a84c] transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">❤️</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-semibold mb-0.5">
                  Airtel Money
                </p>
                <a
                  href={`tel:${CONTACT_INFO.airtelMoneyTel}`}
                  className="font-serif font-bold text-sm text-[#f0ead8] group-hover:text-[#c9a84c] transition-colors"
                >
                  {CONTACT_INFO.airtelMoneyDisplay}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(CONTACT_INFO.airtelMoneyDisplay, 'airtel')}
              className="p-1.5 text-[#8a8699] hover:text-[#c9a84c] cursor-pointer"
              title="Copier le numéro"
            >
              {copiedItem === 'airtel' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="max-w-xl mx-auto bg-[#13111a] border border-[#c9a84c]/25 rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
          {/* Form Title with required Envelope Icon */}
          <div className="flex items-center gap-2.5 mb-2 pb-3 border-b border-[#3d3854]/40">
            <div className="p-2 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f0ead8]">
                Envoyer un message à l'auteur
              </h3>
              <p className="text-xs text-[#8a8699]">
                Transmis directement par e-mail sécurisé
              </p>
            </div>
          </div>

          {/* Feedback Banners */}
          <AnimatePresence>
            {feedback.type === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">{feedback.message}</span>
              </motion.div>
            )}

            {feedback.type === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5 shadow-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="font-medium">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot invisible pour contrer les robots (Champ nommé "website") */}
            <div
              style={{
                display: 'none',
                opacity: 0,
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                height: 0,
                width: 0,
                zIndex: -1,
              }}
              aria-hidden="true"
            >
              <label htmlFor="website-field">Website</label>
              <input
                id="website-field"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>

            {/* Field 1: Nom de l'abonné */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8699] font-medium mb-1.5">
                Nom de l'abonné <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex : Paul Makosso"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/60 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/50 outline-none transition-colors"
              />
            </div>

            {/* Field 2: Adresse email */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8699] font-medium mb-1.5">
                Adresse email <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="abonne@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/60 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/50 outline-none transition-colors"
              />
            </div>

            {/* Field 3: Sujet */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8699] font-medium mb-1.5">
                Sujet <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex : Question sur la nouvelle publication"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/60 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/50 outline-none transition-colors"
              />
            </div>

            {/* Field 4: Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#8a8699] font-medium">
                  Message <span className="text-[#c9a84c]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    message.length > 5000
                      ? 'text-red-400 font-bold'
                      : message.length >= 5
                      ? 'text-[#c9a84c]'
                      : 'text-[#8a8699]'
                  }`}
                >
                  {message.length} / 5 000 car. (min. 5)
                </span>
              </div>
              <textarea
                required
                rows={5}
                minLength={5}
                maxLength={5000}
                placeholder="Écrivez votre message ici (au moins 5 caractères)..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/60 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/50 outline-none transition-colors resize-y"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#8a8699] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Protection anti-spam &amp; transit chiffré</span>
              </span>

              <button
                type="submit"
                disabled={isSending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
