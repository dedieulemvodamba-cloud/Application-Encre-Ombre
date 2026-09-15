import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface OfflineGuideModalProps {
  onClose: () => void;
}

export const OfflineGuideModal: React.FC<OfflineGuideModalProps> = ({ onClose }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#13111a] border border-[#c9a84c]/30 rounded-2xl max-w-2xl w-full text-[#f0ead8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3d3854]/40 flex items-center justify-between bg-[#1e1b28]/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#f0ead8] flex items-center gap-2">
                <span>Mode Hors-Ligne 24h &amp; PWA</span>
              </h3>
              <p className="text-xs text-[#8a8699]">
                Accès sans connexion internet et installation mobile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#3d3854]/30 hover:bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Banner */}
        <div
          className={`px-6 py-2.5 flex items-center justify-between text-xs border-b ${
            isOnline
              ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300'
              : 'bg-amber-950/40 border-amber-500/20 text-amber-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="font-medium">
                  En ligne — Le cache hors-ligne 24h est actif et synchronisé automatiquement.
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                <span className="font-medium">
                  Hors-ligne — Vous consultez la version en cache local. Valide 24 heures sans réseau.
                </span>
              </>
            )}
          </div>
          <span className="font-mono text-[10px] uppercase opacity-75">
            {isOnline ? 'Service Worker Actif' : 'Mode Secours'}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#8a8699] flex-1">
          {/* Quick Summary Box */}
          <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/20 space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#f0ead8] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
              <span>Comment fonctionne le mode hors-ligne 24h ?</span>
            </h4>
            <p className="leading-relaxed">
              Dès votre première visite, le système enregistre automatiquement en mémoire locale
              l'application, la typographie, les couvertures et le catalogue des œuvres. Même en cas de
              coupure réseau, de voyage en zone sans couverture ou de panne d'électricité, vous continuez
              à lire vos livres et vos notes en toute tranquillité.
            </p>
          </div>

          {/* Installation on Mobile Cards */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#f0ead8] mb-3">
              📱 Installer comme une application sur votre téléphone
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Android */}
              <div className="p-3.5 rounded-xl bg-[#1e1b28] border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>🟢 Android (Chrome, Edge, Samsung)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed">
                  <li>Ouvrez le site dans Google Chrome</li>
                  <li>Appuyez sur le menu (les <strong>3 points verticaux</strong> en haut à droite)</li>
                  <li>Sélectionnez <strong>« Installer l'application »</strong> ou <strong>« Ajouter à l'écran d'accueil »</strong></li>
                  <li>Validez : l'icône dorée Encre &amp; Ombre apparaît directement sur votre écran d'accueil</li>
                </ol>
              </div>

              {/* iOS */}
              <div className="p-3.5 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/20 space-y-2">
                <div className="flex items-center gap-2 text-[#c9a84c] font-bold">
                  <span>🍎 iPhone &amp; iPad (Safari)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed">
                  <li>Ouvrez le site dans Safari</li>
                  <li>Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut)</li>
                  <li>Faites défiler vers le bas et sélectionnez <strong>« Sur l'écran d'accueil »</strong></li>
                  <li>Appuyez sur <strong>Ajouter</strong> en haut à droite</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="pt-3 flex justify-end items-center border-t border-[#3d3854]/40">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
