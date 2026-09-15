import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, ChevronRight, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecurityBadgeBannerProps {
  sessionToken: string;
  auditCount: number;
}

export const SecurityBadgeBanner: React.FC<SecurityBadgeBannerProps> = ({
  sessionToken,
  auditCount,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {/* Top Security Status Bar */}
      <div className="bg-[#13111a] border-b border-[#c9a84c]/20 px-4 py-2 text-xs text-[#8a8699]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#e8d49a] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Environnement Sécurisé Actif
            </span>
            <span className="hidden sm:inline text-[#3d3854]">|</span>
            <span className="hidden sm:inline text-[#8a8699]">
              Chiffrement Web Crypto AES-256 & SHA-256
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[#8a8699] text-[11px] hidden md:inline">
              Session: <span className="text-[#c9a84c]">{sessionToken.slice(0, 14)}...</span>
            </span>
            <button
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center gap-1 text-[#c9a84c] hover:text-[#e8d49a] transition-colors font-medium cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Détails de sécurité</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Security Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#13111a] border border-[#c9a84c]/40 rounded-xl max-w-lg w-full p-6 text-[#f0ead8] shadow-2xl relative"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 text-[#8a8699] hover:text-[#f0ead8] p-1.5 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#f0ead8]">
                    Protocoles de Sécurité Appliqués
                  </h3>
                  <p className="text-xs text-[#8a8699]">
                    Architecture zero-trust et protection cryptographique
                  </p>
                </div>
              </div>

              <div className="space-y-3 my-5 text-xs text-[#8a8699]">
                <div className="p-3 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ead8] block mb-0.5">
                      Chiffrement AES-GCM 256 bits côté client
                    </strong>
                    Vos notes privées et sessions sont chiffrées localement via la Web Crypto API
                    du navigateur avant tout stockage.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 flex items-start gap-2.5">
                  <Key className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ead8] block mb-0.5">
                      Contrôle d'intégrité SHA-256
                    </strong>
                    Chaque reçu de commande MTN MoMo et Airtel Money est scellé par une empreinte
                    numérique inviolable.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ead8] block mb-0.5">
                      Filigrane dynamique & Protection DRM
                    </strong>
                    Les extraits d'œuvres sont tagués d'un filigrane dynamique associé à votre
                    identifiant pour contrer la capture pirate.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ead8] block mb-0.5">
                      Journal d'audit de sécurité actif
                    </strong>
                    {auditCount} événement(s) de sécurité enregistrés et vérifiables dans votre
                    espace lecteur.
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#3d3854]/40 flex justify-between items-center text-xs">
                <span className="font-mono text-[#c9a84c] text-[11px] truncate max-w-[260px]">
                  ID: {sessionToken}
                </span>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-1.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-medium rounded transition-colors text-xs"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
