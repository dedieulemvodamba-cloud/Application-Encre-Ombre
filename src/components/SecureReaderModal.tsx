import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { X, Lock, ShieldAlert, Type, Check, ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecureReaderModalProps {
  book: Book | null;
  sessionToken: string;
  onClose: () => void;
  onOrderNow: (book: Book) => void;
  onSecurityEvent: (event: string, details: string) => void;
}

export const SecureReaderModal: React.FC<SecureReaderModalProps> = ({
  book,
  sessionToken,
  onClose,
  onOrderNow,
  onSecurityEvent,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [theme, setTheme] = useState<'noir' | 'sepia' | 'encre'>('noir');
  const [copyAlert, setCopyAlert] = useState(false);

  useEffect(() => {
    if (book) {
      onSecurityEvent(
        'DRM_WATERMARK_VIEW',
        `Ouverture du lecteur sécurisé pour "${book.title}" avec filigrane dynamique`
      );
    }
  }, [book]);

  if (!book) return null;

  const currentChapter = book.chapters[activeChapterIndex] || book.chapters[0];

  const handleCopyAttempt = (e: React.ClipboardEvent | React.MouseEvent) => {
    e.preventDefault();
    setCopyAlert(true);
    onSecurityEvent('DRM_COPY_PREVENTED', `Tentative de copie interceptée dans "${book.title}"`);
    setTimeout(() => setCopyAlert(false), 3500);
  };

  // Font size classes
  const fontClass =
    fontSize === 'sm'
      ? 'text-sm leading-relaxed'
      : fontSize === 'lg'
      ? 'text-lg sm:text-xl leading-loose'
      : 'text-base sm:text-lg leading-relaxed';

  // Theme container classes
  let themeBg = 'bg-[#0c0b0f] text-[#f0ead8]';
  if (theme === 'sepia') {
    themeBg = 'bg-[#1a1714] text-[#ede4d8]';
  } else if (theme === 'encre') {
    themeBg = 'bg-[#13101c] text-[#ece8f4]';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className={`relative w-full max-w-4xl h-[92vh] flex flex-col rounded-2xl border border-[#c9a84c]/30 shadow-2xl overflow-hidden ${themeBg}`}
        onContextMenu={handleCopyAttempt}
        onCopy={handleCopyAttempt}
      >
        {/* Anti-copy warning banner */}
        <AnimatePresence>
          {copyAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#7a1c2e] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-red-400/40 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Protection Numérique Active :</strong> La copie et l'extraction de texte sont
                désactivées afin de protéger les droits de l'auteur.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reader Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#3d3854]/40 bg-[#13111a]/80 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-1.5 rounded-md bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 shrink-0">
              <Lock className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#f0ead8] truncate">
                {book.title}
              </h3>
              <p className="text-[11px] text-[#8a8699] truncate">
                {book.genre} • Extrait Numérique Sécurisé
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Font size toggles */}
            <div className="hidden sm:flex items-center bg-[#1e1b28] border border-[#3d3854]/50 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  fontSize === 'sm' ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold' : 'text-[#8a8699]'
                }`}
                title="Petite taille de texte"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  fontSize === 'base' ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold' : 'text-[#8a8699]'
                }`}
                title="Taille normale"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  fontSize === 'lg' ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold' : 'text-[#8a8699]'
                }`}
                title="Grande taille"
              >
                A+
              </button>
            </div>

            {/* Theme switcher */}
            <div className="hidden md:flex items-center gap-1 bg-[#1e1b28] border border-[#3d3854]/50 rounded-lg p-0.5 text-[11px]">
              <button
                onClick={() => setTheme('noir')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  theme === 'noir' ? 'bg-[#3d3854] text-white font-medium' : 'text-[#8a8699]'
                }`}
              >
                Noir
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  theme === 'sepia' ? 'bg-[#c9a84c] text-[#0c0b0f] font-medium' : 'text-[#8a8699]'
                }`}
              >
                Sépia
              </button>
              <button
                onClick={() => setTheme('encre')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  theme === 'encre' ? 'bg-[#7a1c2e] text-white font-medium' : 'text-[#8a8699]'
                }`}
              >
                Encre
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[#3d3854]/40 hover:bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] transition-colors cursor-pointer"
              aria-label="Fermer le lecteur"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Selection Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-2 bg-[#13111a]/40 border-b border-[#3d3854]/20 text-xs text-[#8a8699]">
          <div className="flex items-center gap-2 overflow-x-auto">
            {book.chapters.map((ch, idx) => (
              <button
                key={ch.number}
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3 py-1 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeChapterIndex === idx
                    ? 'bg-[#c9a84c]/20 text-[#e8d49a] border border-[#c9a84c]/40 font-semibold'
                    : 'hover:text-[#f0ead8]'
                }`}
              >
                Chapitre {ch.number}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline font-mono text-[10px] text-[#c9a84c]/70 shrink-0">
            DRM ACTIF: {sessionToken.slice(0, 10)}
          </span>
        </div>

        {/* Reader Content Body with Dynamic Watermark */}
        <div className="relative flex-1 overflow-y-auto px-6 sm:px-12 md:px-20 py-8 select-none">
          {/* Dynamic diagonal watermarks to discourage unauthorized photo/screengrab */}
          <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-around items-center opacity-[0.035] select-none rotate-[-18deg] text-center font-mono text-xs uppercase tracking-widest leading-loose">
            <div>
              ENCRE &amp; OMBRE • LECTURE CERTIFIÉE SÉCURISÉE • {sessionToken} • TOUS DROITS RÉSERVÉS
            </div>
            <div>
              DIFFUSION NUMÉRIQUE SÉCURISÉE • AUTH REQ • BRAZZAVILLE • NEW YORK • {sessionToken}
            </div>
            <div>
              PROPRIÉTÉ LITTÉRAIRE STRICTE • REPRODUCTION INTERDITE • TRACABILITÉ ACTIVE
            </div>
          </div>

          {/* Chapter Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-8 pb-4 border-b border-[#3d3854]/30">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a84c] block mb-1">
                Chapitre {currentChapter.number}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f0ead8]">
                {currentChapter.title}
              </h2>
            </div>

            <div className={`space-y-6 font-serif ${fontClass}`}>
              {currentChapter.content.map((paragraph, pIdx) => {
                if (
                  paragraph.startsWith('NOTE :') ||
                  paragraph.startsWith("NOTE DE L'AUTEUR :") ||
                  paragraph.startsWith('CYCLE DES 50') ||
                  paragraph.startsWith('AVERTISSEMENT :') ||
                  paragraph.startsWith('STRUCTURE DE LA DYLOGIE :') ||
                  paragraph.startsWith('LES QUATRE DE VALOMBRE :')
                ) {
                  const isAvertissement = paragraph.startsWith('AVERTISSEMENT :');
                  const isValombre =
                    paragraph.startsWith('STRUCTURE DE LA DYLOGIE :') ||
                    paragraph.startsWith('LES QUATRE DE VALOMBRE :');
                  return (
                    <div
                      key={pIdx}
                      className={`p-4 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed not-italic ${
                        isAvertissement
                          ? 'bg-red-950/40 border-red-700/50 text-red-200'
                          : isValombre
                          ? 'bg-[#1e1722] border-red-900/40 text-red-300 font-semibold'
                          : 'bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#e8d49a]'
                      }`}
                    >
                      <strong
                        className={`block mb-1 ${
                          isAvertissement ? 'text-red-400 font-bold uppercase tracking-wider' : 'text-[#f0ead8]'
                        }`}
                      >
                        {isAvertissement
                          ? "⚠️ Avertissement de l'auteur :"
                          : paragraph.startsWith('STRUCTURE')
                          ? "Structure du Roman d'Horreur :"
                          : paragraph.startsWith('LES QUATRE')
                          ? 'Les Protagonistes de Valombre :'
                          : paragraph.startsWith('CYCLE')
                          ? "Structure de l'Essai :"
                          : "Note de l'Auteur :"}
                      </strong>
                      {paragraph.replace(
                        /^(NOTE\s*:|NOTE DE L'AUTEUR\s*:|CYCLE DES 50 VARIATIONS COMBINATOIRES\s*:|AVERTISSEMENT\s*:|STRUCTURE DE LA DYLOGIE\s*:|LES QUATRE DE VALOMBRE\s*:)\s*/,
                        ''
                      )}
                    </div>
                  );
                }

                if (paragraph.startsWith('« ') && paragraph.includes('»')) {
                  return (
                    <blockquote
                      key={pIdx}
                      className="my-6 p-4 rounded-xl bg-[#1e1b28]/90 border-l-4 border-[#c9a84c] text-center text-[#e8d49a] font-serif italic text-base sm:text-lg shadow-sm whitespace-pre-line"
                    >
                      {paragraph}
                    </blockquote>
                  );
                }

                if (
                  paragraph.startsWith('Noé :') ||
                  paragraph.startsWith('Alma :') ||
                  paragraph.startsWith('James :') ||
                  paragraph.startsWith('Mia :') ||
                  paragraph.startsWith('Voix inconnue :')
                ) {
                  const colonIndex = paragraph.indexOf(' : ');
                  const speaker = paragraph.slice(0, colonIndex);
                  const line = paragraph.slice(colonIndex + 3);

                  let speakerColor = 'text-[#c9a84c]';
                  if (speaker === 'Alma') speakerColor = 'text-[#e07a5f]';
                  if (speaker === 'James') speakerColor = 'text-[#7da3d3]';
                  if (speaker === 'Mia') speakerColor = 'text-[#7ab890]';

                  return (
                    <div
                      key={pIdx}
                      className="p-3 sm:p-3.5 my-2.5 rounded-lg bg-[#191624] border border-[#3d3854]/40 font-sans text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1.5 shadow-inner"
                    >
                      <span className={`font-bold ${speakerColor} uppercase tracking-wider text-[11px] shrink-0`}>
                        {speaker} :
                      </span>
                      <span className="italic text-[#f0ead8] font-serif text-sm">
                        {line}
                      </span>
                    </div>
                  );
                }

                if (paragraph.startsWith('• ')) {
                  const parts = paragraph.replace('• ', '').split(' — ');
                  return (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 font-sans text-xs sm:text-sm text-[#d4cfbd]"
                    >
                      <span className="font-bold text-[#c9a84c]">{parts[0]}</span>
                      {parts[1] && <span className="text-[#8a8699]"> — {parts[1]}</span>}
                    </div>
                  );
                }

                if (paragraph.startsWith('PAGE ') || paragraph.startsWith('[Case')) {
                  const lines = paragraph.split('\n');
                  const header = lines[0];
                  const bodyLines = lines.slice(1);

                  return (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-xl bg-[#0d0c13] border border-[#4a6fa5]/40 text-xs sm:text-sm font-sans space-y-2.5 shadow-md not-italic"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#3d3854]/40">
                        <span className="text-[11px] font-bold text-[#7da3d3] uppercase tracking-wider font-mono">
                          {header}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#4a6fa5]/20 text-[#7da3d3] border border-[#4a6fa5]/30">
                          Storyboard BD
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-1 text-[#f0ead8]/90 leading-relaxed">
                        {bodyLines.map((line, lIdx) => (
                          <p
                            key={lIdx}
                            className={
                              line.startsWith('David') || line.startsWith('Sarah')
                                ? 'text-[#e8d49a] font-medium'
                                : 'text-[#8a8699] italic'
                            }
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (paragraph.startsWith('SUITE DU DÉCOUPAGE BD')) {
                  return (
                    <div
                      key={pIdx}
                      className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/20 text-xs sm:text-sm font-sans text-[#8a8699] leading-relaxed whitespace-pre-wrap not-italic"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a84c] block mb-1">
                        Production Graphique
                      </span>
                      {paragraph}
                    </div>
                  );
                }

                if (paragraph.startsWith('🌟 MORALE DU CONTE :')) {
                  return (
                    <div
                      key={pIdx}
                      className="my-6 p-5 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#1e1b28] to-amber-500/15 border border-amber-400/40 text-center not-italic shadow-lg"
                    >
                      <span className="inline-block text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30">
                        🌟 Morale de l'Histoire
                      </span>
                      <p className="font-serif italic text-base sm:text-lg text-[#f0ead8] leading-relaxed">
                        {paragraph.replace('🌟 MORALE DU CONTE :\n', '')}
                      </p>
                    </div>
                  );
                }

                if (paragraph.startsWith('INVITATION DU SOIR :')) {
                  return (
                    <div
                      key={pIdx}
                      className="my-6 p-6 rounded-2xl bg-gradient-to-b from-[#1c192c] to-[#0e0c18] border-2 border-indigo-400/40 text-center not-italic shadow-xl"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-indigo-300 mb-3 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                        🧸 Rituel du Soir pour les Petits
                      </span>
                      <p className="font-serif italic text-base sm:text-lg text-[#f0ead8] leading-relaxed whitespace-pre-line">
                        {paragraph.replace('INVITATION DU SOIR :\n', '')}
                      </p>
                    </div>
                  );
                }

                if (paragraph.startsWith('⭐') || paragraph.startsWith('🌸') || paragraph.startsWith('🦋') || paragraph.startsWith('🌈')) {
                  return (
                    <div
                      key={pIdx}
                      className="ml-6 sm:ml-10 my-2 px-3.5 py-2 rounded-lg bg-[#221e33]/70 border border-indigo-400/20 text-indigo-200 font-serif italic text-sm sm:text-base flex items-center gap-2"
                    >
                      <span>{paragraph}</span>
                    </div>
                  );
                }

                if (
                  paragraph === 'CRIC… CRAC…' ||
                  paragraph === 'Houuu… houuu…' ||
                  paragraph === 'Chhh… chhh…' ||
                  paragraph === 'PLOUF !'
                ) {
                  return (
                    <div
                      key={pIdx}
                      className="my-3 py-2 px-4 rounded-lg bg-[#0d0b16] border border-amber-400/30 text-center font-mono tracking-widest text-amber-300 text-sm italic font-bold shadow-inner"
                    >
                      {paragraph === 'PLOUF !' ? '✨ PLOUF ! ✨' : `🌙 ${paragraph}`}
                    </div>
                  );
                }

                if (paragraph.startsWith('— ') && book.badge === 'jeunesse') {
                  return (
                    <p key={pIdx} className="pl-4 sm:pl-6 border-l-2 border-amber-400/40 text-[#f0ead8]/95 font-serif text-base sm:text-lg my-2">
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p key={pIdx} className="indent-6 sm:indent-8">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* End of preview note */}
            <div className="mt-12 p-6 rounded-xl bg-[#1e1b28]/80 border border-[#c9a84c]/30 text-center">
              <span className="text-xs uppercase tracking-widest text-[#c9a84c] block mb-1">
                Fin de l'extrait gratuit
              </span>
              <h4 className="font-serif text-lg font-bold text-[#f0ead8] mb-2">
                Envie de découvrir la suite de « {book.title} » ?
              </h4>
              <p className="text-xs text-[#8a8699] max-w-md mx-auto mb-4">
                Commandez l'œuvre complète et recevez immédiatement votre clé numérique chiffrée
                ainsi que l'accès intégral dans votre espace lecteur.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOrderNow(book);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Commander l'œuvre ({book.priceFcfa.toLocaleString('fr-FR')} FCFA)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reader Footer Navigation */}
        <div className="px-4 sm:px-8 py-3 bg-[#13111a] border-t border-[#3d3854]/40 flex items-center justify-between text-xs text-[#8a8699] z-20">
          <button
            onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
            disabled={activeChapterIndex === 0}
            className="inline-flex items-center gap-1 hover:text-[#f0ead8] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <span className="text-[11px] font-mono text-[#c9a84c]">
            Chapitre {activeChapterIndex + 1} sur {book.chapters.length}
          </span>

          <button
            onClick={() =>
              setActiveChapterIndex(Math.min(book.chapters.length - 1, activeChapterIndex + 1))
            }
            disabled={activeChapterIndex === book.chapters.length - 1}
            className="inline-flex items-center gap-1 hover:text-[#f0ead8] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
