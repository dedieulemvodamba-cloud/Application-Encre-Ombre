import React, { useState } from 'react';
import { Logo } from './Logo';
import { CONTACT_INFO } from '../data/books';
import { Sparkles, ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NeRatezRienLandingPageProps {
  onBackToPlatform?: () => void;
  onSecurityEvent?: (event: string, details: string) => void;
}

export const NeRatezRienLandingPage: React.FC<NeRatezRienLandingPageProps> = ({
  onBackToPlatform,
  onSecurityEvent,
}) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorField, setErrorField] = useState<'prenom' | 'email' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorField(null);

    if (!prenom.trim()) {
      setErrorField('prenom');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorField('email');
      return;
    }

    setIsSubscribed(true);
    if (onSecurityEvent) {
      onSecurityEvent(
        'COMMUNITY_LANDING_SUBSCRIBED',
        `Nouvel abonné via Page Ne Ratez Rien : ${prenom} (${email})`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b0f] text-[#f0ead8] font-sans relative overflow-x-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Background Ambience */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(122,28,46,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(201,168,76,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Top Floating Bar to Switch to Main Platform */}
      {onBackToPlatform && (
        <div className="w-full max-w-xl flex items-center justify-between mb-6 z-20">
          <button
            onClick={onBackToPlatform}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1b28] hover:bg-[#2d293d] border border-[#c9a84c]/30 text-xs text-[#e8d49a] transition-all cursor-pointer shadow-lg hover:border-[#c9a84c]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Retour au Catalogue des Œuvres</span>
          </button>
          <span className="text-[11px] font-mono text-[#8a8699] uppercase tracking-widest hidden sm:inline-block">
            Page Éditeur Officielle
          </span>
        </div>
      )}

      {/* Container 560px */}
      <div className="relative z-10 w-full max-w-[560px] flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] mb-8"
        >
          <Logo size={220} />
        </motion.div>

        {/* Eyebrow */}
        <p className="text-[11.5px] uppercase tracking-[0.35em] text-[#c9a84c] mb-2 opacity-85 text-center font-medium">
          Rejoignez la communauté
        </p>

        {/* H1 Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#f0ead8] text-center leading-[1.15] mb-2">
          Ne ratez <em className="italic text-[#c9a84c]">rien</em>
        </h1>

        {/* Sous-titre */}
        <p className="font-serif italic text-base text-[#8a8699] text-center max-w-[40ch] leading-relaxed mb-8">
          Romans, BD, essais — recevez chaque nouvelle publication avant tout le monde, directement chez
          vous.
        </p>

        {/* Ligne Déco */}
        <div className="flex items-center gap-3 w-full mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
          <span className="text-base text-[#c9a84c] opacity-70">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
        </div>

        {/* Avantages */}
        <div className="flex flex-col gap-3.5 w-full mb-10 text-left">
          <div className="flex items-start gap-4 p-4 bg-[#1e1b28] border border-[#c9a84c]/12 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">📚</span>
            <div className="space-y-0.5">
              <strong className="block font-serif text-[0.95rem] text-[#f0ead8] font-bold">
                Nouvelles publications en avant-première
              </strong>
              <span className="text-[0.82rem] text-[#8a8699] leading-normal block">
                Soyez le premier à lire chaque nouveau roman, BD ou essai dès sa sortie.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#1e1b28] border border-[#c9a84c]/12 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🎁</span>
            <div className="space-y-0.5">
              <strong className="block font-serif text-[0.95rem] text-[#f0ead8] font-bold">
                Contenus exclusifs réservés aux abonnés
              </strong>
              <span className="text-[0.82rem] text-[#8a8699] leading-normal block">
                Extraits inédits, coulisses de création, chapitres bonus et surprises.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#1e1b28] border border-[#c9a84c]/12 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🔔</span>
            <div className="space-y-0.5">
              <strong className="block font-serif text-[0.95rem] text-[#f0ead8] font-bold">
                Alertes instantanées
              </strong>
              <span className="text-[0.82rem] text-[#8a8699] leading-normal block">
                Notifications dès qu'un nouveau livre est disponible. Zéro manqué.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#1e1b28] border border-[#c9a84c]/12 hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-xl shrink-0 mt-0.5">🌍</span>
            <div className="space-y-0.5">
              <strong className="block font-serif text-[0.95rem] text-[#f0ead8] font-bold">
                Une littérature entre Brazzaville et le monde
              </strong>
              <span className="text-[0.82rem] text-[#8a8699] leading-normal block">
                Des histoires africaines, multiculturelles, sans clichés. Vraiment.
              </span>
            </div>
          </div>
        </div>

        {/* Formulaire Bloc */}
        <div className="w-full bg-[#1e1b28] border border-[#c9a84c]/20 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-serif text-[1.1rem] text-[#c9a84c] text-center mb-5 italic">
                  Abonnez-vous gratuitement
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="text"
                    id="prenom"
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                    value={prenom}
                    onChange={e => {
                      setPrenom(e.target.value);
                      if (errorField === 'prenom') setErrorField(null);
                    }}
                    className={`w-full bg-[#2d293d] border text-[#f0ead8] px-4 py-3 text-sm outline-none transition-colors ${
                      errorField === 'prenom'
                        ? 'border-[#c9a84c]'
                        : 'border-[#c9a84c]/15 focus:border-[#c9a84c]'
                    }`}
                  />

                  <input
                    type="email"
                    id="email"
                    placeholder="Votre adresse email"
                    autoComplete="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errorField === 'email') setErrorField(null);
                    }}
                    className={`w-full bg-[#2d293d] border text-[#f0ead8] px-4 py-3 text-sm outline-none transition-colors ${
                      errorField === 'email'
                        ? 'border-[#7a1c2e]'
                        : 'border-[#c9a84c]/15 focus:border-[#c9a84c]'
                    }`}
                  />

                  <input
                    type="tel"
                    id="telephone"
                    placeholder="Votre WhatsApp (optionnel)"
                    autoComplete="tel"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                    className="w-full bg-[#2d293d] border border-[#c9a84c]/15 focus:border-[#c9a84c] text-[#f0ead8] px-4 py-3 text-sm outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 px-4 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-sm uppercase tracking-[0.18em] transition-all cursor-pointer mt-1.5 relative overflow-hidden"
                  >
                    ✦ Je m'abonne maintenant
                  </button>
                </form>

                <p className="text-center text-[0.72rem] text-[#8a8699] mt-3.5 opacity-60 leading-relaxed">
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
                className="flex flex-col items-center gap-3 p-4 text-center"
              >
                <span className="text-4xl">✨</span>
                <p className="font-serif text-[1.3rem] text-[#c9a84c] italic">
                  Bienvenue dans l'ombre !
                </p>
                <p className="text-[0.88rem] text-[#8a8699] max-w-[35ch] leading-relaxed">
                  <strong className="text-[#f0ead8] font-bold">{prenom}</strong>, vous êtes
                  maintenant abonné(e) à Encre &amp; Ombre. Vous serez le premier à ne rien rater.
                  Bienvenue dans l'ombre ! 🖤
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-xs text-[#8a8699] hover:text-[#c9a84c] underline cursor-pointer"
                  >
                    Inscrire une autre adresse
                  </button>
                  {onBackToPlatform && (
                    <button
                      onClick={onBackToPlatform}
                      className="px-4 py-2 bg-[#c9a84c] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Découvrir les 8 Livres
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Réseaux Sociaux */}
        <div className="mt-10 flex flex-col items-center gap-4 w-full">
          <p className="text-[0.72rem] tracking-[0.25em] text-[#8a8699] uppercase">
            Suivez-nous aussi sur
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#c9a84c]/20 text-[#8a8699] text-xs tracking-wider bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#c9a84c]/20 text-[#8a8699] text-xs tracking-wider bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#c9a84c]/20 text-[#8a8699] text-xs tracking-wider bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
              </svg>
              <span>TikTok</span>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.mtnMomoTel.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#c9a84c]/20 text-[#8a8699] text-xs tracking-wider bg-[#1e1b28] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Paiement */}
        <div className="mt-8 w-full bg-[#1e1b28] border border-[#c9a84c]/15 p-5">
          <p className="text-[0.72rem] tracking-[0.2em] text-[#c9a84c] uppercase mb-3 text-center">
            Commandes &amp; Paiements
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="text-[#f0ead8] hover:text-[#c9a84c] text-[0.88rem] transition-colors"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>💛</span>
              <span className="text-[#f0ead8] text-[0.88rem]">
                MTN MoMo : {CONTACT_INFO.mtnMomoDisplay}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>❤️</span>
              <span className="text-[#f0ead8] text-[0.88rem]">
                Airtel Money : {CONTACT_INFO.airtelMoneyDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 font-serif text-[0.85rem] text-[#8a8699] opacity-40 tracking-widest text-center">
          © 2026 Encre &amp; Ombre · Littérature sans frontières
        </p>
      </div>
    </div>
  );
};
