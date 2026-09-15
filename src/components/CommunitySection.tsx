import React, { useState } from 'react';
import { Logo } from './Logo';
import { CONTACT_INFO } from '../data/books';
import { sanitizeInput, generateSecureToken } from '../lib/crypto';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunitySectionProps {
  onSecurityEvent: (event: string, details: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onSecurityEvent }) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [subscriberToken, setSubscriberToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!prenom.trim()) {
      setError('Veuillez renseigner votre prénom.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Veuillez renseigner une adresse email valide.');
      return;
    }

    const sanitizedPrenom = sanitizeInput(prenom);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedTel = sanitizeInput(telephone);

    const token = generateSecureToken('VIP-MEM', 8);
    setSubscriberToken(token);
    setIsSubscribed(true);

    onSecurityEvent(
      'NEWSLETTER_SUBSCRIBED',
      `Abonnement VIP validé pour ${sanitizedPrenom} (${sanitizedEmail}) - Clé: ${token}`
    );

    // Notification propriétaire : l'adresse de destination reste côté serveur.
    fetch('/api/notify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Abonnement communauté / soutien',
        name: sanitizedPrenom,
        email: sanitizedEmail,
        phone: sanitizedTel,
        plan: 'Communauté VIP',
        amountFcfa: 0,
        status: 'ACTIVE',
        reference: token,
      }),
    }).catch(() => {
      // L'inscription locale reste valide même si le service e-mail est indisponible.
    });
  };

  return (
    <section id="communaute" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#0c0b0f] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#c9a84c]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-[#7a1c2e]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Animated Floating Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <Logo size={190} />
        </motion.div>

        {/* Eyebrow */}
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c9a84c] font-semibold mb-3 opacity-90">
          Rejoignez la communauté
        </p>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#f0ead8] leading-tight mb-3">
          Ne ratez <em className="italic text-[#c9a84c] not-italic">rien</em>
        </h2>

        {/* Subtitle */}
        <p className="font-serif italic text-sm sm:text-base text-[#8a8699] max-w-[42ch] leading-relaxed mb-8">
          Romans, BD, essais — recevez chaque nouvelle publication avant tout le monde, directement
          chez vous.
        </p>

        {/* Decorative Gold Line */}
        <div className="flex items-center gap-3 w-full max-w-xs mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
          <span className="text-[#c9a84c] opacity-80 text-sm">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
        </div>

        {/* Avantages Cards */}
        <div className="w-full flex flex-col gap-3 mb-10 text-left">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">📚</span>
            <div>
              <strong className="block font-serif text-sm text-[#f0ead8] mb-0.5">
                Nouvelles publications en avant-première
              </strong>
              <span className="text-xs text-[#8a8699] leading-relaxed block">
                Soyez le premier à lire chaque nouveau roman, BD ou essai dès sa sortie.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🎁</span>
            <div>
              <strong className="block font-serif text-sm text-[#f0ead8] mb-0.5">
                Contenus exclusifs réservés aux abonnés
              </strong>
              <span className="text-xs text-[#8a8699] leading-relaxed block">
                Extraits inédits, coulisses de création, chapitres bonus et surprises.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🔔</span>
            <div>
              <strong className="block font-serif text-sm text-[#f0ead8] mb-0.5">
                Alertes instantanées
              </strong>
              <span className="text-xs text-[#8a8699] leading-relaxed block">
                Notifications dès qu'un nouveau livre est disponible. Zéro manqué.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🌍</span>
            <div>
              <strong className="block font-serif text-sm text-[#f0ead8] mb-0.5">
                Une littérature entre Brazzaville et le monde
              </strong>
              <span className="text-xs text-[#8a8699] leading-relaxed block">
                Des histoires africaines, multiculturelles, sans clichés. Vraiment.
              </span>
            </div>
          </div>
        </div>

        {/* Subscription Form Block */}
        <div className="w-full bg-[#1e1b28] border border-[#c9a84c]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-serif italic text-base text-[#c9a84c] text-center mb-5">
                  Abonnez-vous gratuitement
                </p>

                {error && (
                  <div className="mb-4 p-2.5 rounded-lg bg-red-900/30 border border-red-700/50 text-red-200 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2d293d] border border-[#c9a84c]/20 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/60 outline-none transition-colors"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2d293d] border border-[#c9a84c]/20 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/60 outline-none transition-colors"
                  />

                  <input
                    type="tel"
                    placeholder="Votre WhatsApp (optionnel)"
                    autoComplete="tel"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2d293d] border border-[#c9a84c]/20 focus:border-[#c9a84c] text-sm text-[#f0ead8] placeholder-[#8a8699]/60 outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-[0.18em] rounded-lg transition-all cursor-pointer shadow-lg hover:shadow-[#c9a84c]/20 mt-1"
                  >
                    ✦ Je m'abonne maintenant
                  </button>
                </form>

                <p className="text-[11px] text-[#8a8699] text-center mt-3.5 opacity-70 leading-relaxed">
                  Gratuit · Aucun spam · Désinscription en un clic
                  <br />
                  Vos données ne sont jamais partagées.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center space-y-3"
              >
                <span className="text-4xl block">✨</span>
                <h3 className="font-serif text-2xl font-bold text-[#c9a84c] italic">
                  Bienvenue dans l'ombre !
                </h3>
                <p className="text-sm text-[#f0ead8] max-w-sm mx-auto leading-relaxed">
                  <strong className="text-[#e8d49a]">{prenom}</strong>, vous êtes maintenant
                  abonné(e) à Encre &amp; Ombre. Vous serez le premier à ne rien rater. 🖤
                </p>
                {subscriberToken && (
                  <div className="pt-2">
                    <span className="text-[10px] text-[#8a8699] uppercase tracking-wider block mb-1">
                      Votre jeton membre VIP chiffré :
                    </span>
                    <span className="font-mono text-xs text-[#c9a84c] bg-[#13111a] px-3 py-1.5 rounded border border-[#3d3854]">
                      {subscriberToken}
                    </span>
                  </div>
                )}
                <div className="pt-3">
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-xs text-[#8a8699] hover:text-[#c9a84c] underline cursor-pointer"
                  >
                    Inscrire une autre adresse
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 flex flex-col items-center gap-3 w-full">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8a8699]">
            Suivez-nous aussi sur
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c9a84c]/20 bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs tracking-wider text-[#8a8699] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c9a84c]/20 bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs tracking-wider text-[#8a8699] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c9a84c]/20 bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs tracking-wider text-[#8a8699] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
              </svg>
              <span>TikTok</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT_INFO.mtnMomoTel.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-[#1e1b28] hover:border-emerald-400 text-emerald-400 text-xs tracking-wider transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Commandes & Paiements Reminder Banner */}
        <div className="mt-8 w-full bg-[#1e1b28] border border-[#c9a84c]/20 rounded-xl p-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-2 font-semibold">
            Commandes &amp; Paiements Sécurisés
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-xs text-[#f0ead8]">
            <div className="flex items-center gap-1.5">
              <span>📞</span>
              <a href={`tel:${CONTACT_INFO.phoneTel}`} className="hover:text-[#c9a84c]">
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
            <span className="text-[#3d3854]">•</span>
            <div className="flex items-center gap-1.5">
              <span>💛</span>
              <span>MTN MoMo : {CONTACT_INFO.mtnMomoDisplay}</span>
            </div>
            <span className="text-[#3d3854]">•</span>
            <div className="flex items-center gap-1.5">
              <span>❤️</span>
              <span>Airtel Money : {CONTACT_INFO.airtelMoneyDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
