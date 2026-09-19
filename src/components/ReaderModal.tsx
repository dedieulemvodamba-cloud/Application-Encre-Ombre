import React, { useState, useEffect } from 'react';
import { Story } from '../data/stories';
import { X, ExternalLink, Type, Sun, Moon, ArrowLeft, ArrowRight, Bookmark, Volume2, VolumeX, CloudRain, Lock, ShieldCheck } from 'lucide-react';
import { ambianceSoundscape } from '../utils/audioAmbiance';
import { isStoryUnlocked } from '../lib/purchases';
import { PurchaseModal } from './PurchaseModal';

interface ReaderModalProps {
  story: Story;
  onClose: () => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({ story, onClose }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number>(18);
  const [readerTheme, setReaderTheme] = useState<'dark' | 'indigo' | 'sepia'>('dark');
  const [soundActive, setSoundActive] = useState(ambianceSoundscape.getStatus());
  const [unlocked, setUnlocked] = useState(() => isStoryUnlocked(story.id));
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchaseInitialStep, setPurchaseInitialStep] = useState<'pay' | 'restore'>('pay');

  useEffect(() => {
    const unsubscribe = ambianceSoundscape.subscribe((state) => {
      setSoundActive(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const displayChapters =
    unlocked && story.fullChapters && story.fullChapters.length > 0
      ? story.fullChapters
      : story.chapters;
  const chapter = displayChapters[currentChapterIndex] || displayChapters[0];

  const toggleSound = () => {
    ambianceSoundscape.toggle();
  };

  const getThemeStyles = () => {
    switch (readerTheme) {
      case 'sepia':
        return {
          bg: '#f3e8d0',
          cardBg: '#e9dbbd',
          text: '#1c1930',
          dimText: '#5e5a6a',
          accent: '#7a2331',
          border: 'rgba(122, 35, 49, 0.2)'
        };
      case 'indigo':
        return {
          bg: '#1c1930',
          cardBg: '#262b4a',
          text: '#f3e8d0',
          dimText: '#a9a4b8',
          accent: '#dcc074',
          border: 'rgba(201, 162, 75, 0.25)'
        };
      case 'dark':
      default:
        return {
          bg: '#14121b',
          cardBg: '#1c1930',
          text: '#f3e8d0',
          dimText: '#a9a4b8',
          accent: '#c9a24b',
          border: 'rgba(201, 162, 75, 0.25)'
        };
    }
  };

  const currentStyles = getThemeStyles();

  return (
    <div
      id="reader-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md bg-black/80 flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="reader-container"
        className="relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border transition-colors duration-300"
        style={{
          backgroundColor: currentStyles.bg,
          color: currentStyles.text,
          borderColor: currentStyles.border
        }}
      >
        {/* Reader Top Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{
            borderColor: currentStyles.border,
            backgroundColor: currentStyles.cardBg
          }}
        >
          <div className="flex flex-col text-left">
            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: currentStyles.accent }}
            >
              {story.universeLabel} · Épisode {chapter.number}
            </span>
            <h3
              className="text-lg font-medium tracking-tight truncate max-w-md"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {story.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Soundscape button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded hover:bg-black/10 transition-colors"
              title="Ambiance sonore nocturne"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 animate-pulse" style={{ color: currentStyles.accent }} />
              ) : (
                <VolumeX className="w-4 h-4 opacity-60" />
              )}
            </button>

            {/* Font size control */}
            <div className="flex items-center border rounded px-2 py-1 gap-1 text-xs" style={{ borderColor: currentStyles.border }}>
              <button
                onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
                className="px-1 font-serif font-bold opacity-70 hover:opacity-100"
                title="Diminuer la taille"
              >
                A-
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
                className="px-1 font-serif font-bold opacity-70 hover:opacity-100"
                title="Augmenter la taille"
              >
                A+
              </button>
            </div>

            {/* Theme switcher */}
            <div className="flex items-center border rounded p-1 gap-1 text-xs" style={{ borderColor: currentStyles.border }}>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-5 h-5 rounded-full bg-[#14121b] border ${readerTheme === 'dark' ? 'border-[#c9a24b] scale-110' : 'border-white/20'}`}
                title="Thème Ombre Noire"
              />
              <button
                onClick={() => setReaderTheme('indigo')}
                className={`w-5 h-5 rounded-full bg-[#262b4a] border ${readerTheme === 'indigo' ? 'border-[#c9a24b] scale-110' : 'border-white/20'}`}
                title="Thème Nuit Indigo"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-5 h-5 rounded-full bg-[#f3e8d0] border ${readerTheme === 'sepia' ? 'border-[#7a2331] scale-110' : 'border-black/20'}`}
                title="Thème Parchemin"
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/10 transition-colors ml-2"
              aria-label="Fermer le lecteur"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Scrollable Content */}
        <div className="overflow-y-auto px-8 sm:px-16 py-10 flex-1 space-y-6 text-left">
          <div className="text-center pb-6 border-b" style={{ borderColor: currentStyles.border }}>
            <span
              className="text-xs uppercase tracking-widest font-semibold block mb-1"
              style={{ color: currentStyles.accent }}
            >
              Chapitre {chapter.number}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-medium"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {chapter.title}
            </h2>
            <p className="text-xs italic mt-2" style={{ color: currentStyles.dimText }}>
              Durée de lecture estimée : {chapter.duration} · Auteur : {story.author}
            </p>
          </div>

          <div
            className="font-serif leading-[1.8] space-y-5"
            style={{
              fontSize: `${fontSize}px`,
              maxWidth: '65ch',
              margin: '0 auto'
            }}
          >
            {chapter.text.map((paragraph, idx) => {
              const shouldDropCap = idx === 0 && /^[a-zA-ZÀ-ÿ]/.test(paragraph.charAt(0));
              return (
                <p key={idx} className="indent-6 first-of-type:indent-0 leading-relaxed">
                  {shouldDropCap && (
                    <span
                      className="float-left text-5xl sm:text-6xl font-serif pr-3 pt-1 leading-none font-medium"
                      style={{ color: currentStyles.accent, fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {shouldDropCap ? paragraph.slice(1) : paragraph}
                </p>
              );
            })}
          </div>

          {/* End of Chapter notice */}
          {unlocked ? (
            <div
              className="mt-12 p-5 rounded-xl text-center border flex items-center justify-center gap-2"
              style={{
                backgroundColor: currentStyles.cardBg,
                borderColor: currentStyles.border
              }}
            >
              <ShieldCheck className="w-4 h-4" style={{ color: currentStyles.accent }} />
              <span className="text-sm" style={{ color: currentStyles.dimText }}>
                Livre débloqué — merci pour votre soutien.
              </span>
            </div>
          ) : (
            <div
              className="mt-12 p-6 rounded-xl text-center space-y-4 border"
              style={{
                backgroundColor: currentStyles.cardBg,
                borderColor: currentStyles.border
              }}
            >
              <Lock className="w-6 h-6 mx-auto opacity-75" style={{ color: currentStyles.accent }} />
              <p
                className="text-lg font-medium"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Fin de l'extrait pour ce chapitre
              </p>
              <p className="text-sm max-w-md mx-auto" style={{ color: currentStyles.dimText }}>
                L'intégralité des {story.episodesCount} épisodes de « {story.title} » se débloque directement ici, après paiement Mobile Money.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => { setPurchaseInitialStep('pay'); setShowPurchase(true); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider bg-[#c9a24b] text-[#14121b] hover:bg-[#dcc074] transition-colors"
                >
                  <span>Débloquer le livre complet</span>
                </button>
              </div>
              <button
                onClick={() => { setPurchaseInitialStep('restore'); setShowPurchase(true); }}
                className="text-xs underline underline-offset-4 opacity-80 hover:opacity-100"
                style={{ color: currentStyles.dimText }}
              >
                Déjà acheté sur un autre appareil ? Retrouvez votre livre
              </button>
            </div>
          )}
        </div>

        {/* Reader Bottom Navigation */}
        <div
          className="flex items-center justify-between px-6 py-3 border-t shrink-0 text-xs"
          style={{
            borderColor: currentStyles.border,
            backgroundColor: currentStyles.cardBg
          }}
        >
          <button
            disabled={currentChapterIndex === 0}
            onClick={() => setCurrentChapterIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 py-1.5 px-3 rounded border disabled:opacity-30 transition-opacity"
            style={{ borderColor: currentStyles.border }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Chapitre précédent</span>
          </button>

          <span style={{ color: currentStyles.dimText }}>
            Épisode {chapter.number} sur {displayChapters.length} {unlocked ? '' : 'disponible en aperçu'}
          </span>

          <button
            disabled={currentChapterIndex >= displayChapters.length - 1}
            onClick={() => setCurrentChapterIndex((prev) => Math.min(displayChapters.length - 1, prev + 1))}
            className="flex items-center gap-1 py-1.5 px-3 rounded border disabled:opacity-30 transition-opacity"
            style={{ borderColor: currentStyles.border }}
          >
            <span>Chapitre suivant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showPurchase && (
        <PurchaseModal
          story={story}
          initialStep={purchaseInitialStep}
          onClose={() => setShowPurchase(false)}
          onUnlocked={() => {
            setUnlocked(true);
            setShowPurchase(false);
          }}
        />
      )}
    </div>
  );
};
