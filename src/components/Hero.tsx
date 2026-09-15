import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowDown, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenOeuvres: () => void;
  onOpenMemberArea: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOeuvres, onOpenMemberArea }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center flex-col text-center px-4 sm:px-8 pt-20 pb-16 overflow-hidden bg-[#0c0b0f]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7a1c2e]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 80px, #c9a84c 80px, #c9a84c 81px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1b28]/80 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-6 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e8d49a]" />
          <span>Littérature sans frontières</span>
          <span className="text-[#3d3854]">•</span>
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <Lock className="w-3 h-3" /> Édition Certifiée
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#f0ead8] leading-[1.05] mb-4 tracking-tight"
        >
          Les mots qui <span className="italic text-[#c9a84c] block sm:inline">hantent</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic text-[#8a8699] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed my-6 font-light"
        >
          Romans, bandes dessinées, essais. Des histoires nées entre Brazzaville et New York, entre
          l'ombre et la lumière. Protégées par signature numérique et diffusées en haute
          fidélité.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
        >
          <a
            href="#oeuvres"
            onClick={onOpenOeuvres}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-sm border border-[#c9a84c] bg-[#c9a84c] text-[#0c0b0f] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#e8d49a] hover:border-[#e8d49a] transition-all shadow-lg shadow-[#c9a84c]/10 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Découvrir les œuvres</span>
          </a>

          <button
            onClick={onOpenMemberArea}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm border border-[#c9a84c]/50 bg-[#1e1b28]/80 text-[#e8d49a] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#1e1b28] hover:border-[#c9a84c] transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
            <span>Espace Lecteur Sécurisé</span>
          </button>
        </motion.div>

        {/* Security verification highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-[#c9a84c]/10 text-xs text-[#8a8699] max-w-xl"
        >
          <div className="flex flex-col items-center">
            <span className="text-[#f0ead8] font-serif font-bold text-sm">Zéro Piratage</span>
            <span>DRM de lecture discret</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#f0ead8] font-serif font-bold text-sm">Paiements 242</span>
            <span>MTN MoMo &amp; Airtel Sécurisés</span>
          </div>
          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <span className="text-[#f0ead8] font-serif font-bold text-sm">Coffre AES-256</span>
            <span>Notes privées protégées</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <a
          href="#oeuvres"
          className="mt-14 inline-flex flex-col items-center gap-2 text-[#8a8699] hover:text-[#c9a84c] transition-colors text-[10px] tracking-[0.2em] uppercase"
        >
          <span>Défiler</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c] to-transparent animate-bounce" />
        </a>
      </div>
    </section>
  );
};
