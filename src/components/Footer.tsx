import React from 'react';
import { Shield, Lock, AlertOctagon, Smartphone } from 'lucide-react';

interface FooterProps {
  onEmergencyLock: () => void;
  onOpenMemberArea: () => void;
  onOpenOfflineGuide?: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onEmergencyLock,
  onOpenMemberArea,
  onOpenOfflineGuide,
  onOpenAdminPanel,
}) => {
  return (
    <footer className="bg-[#0c0b0f] border-t border-[#c9a84c]/15 px-4 sm:px-8 lg:px-12 py-10 text-xs text-[#8a8699]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <a href="#" className="font-serif text-lg font-black text-[#c9a84c] tracking-wide">
            Encre <span className="font-normal italic text-[#e8d49a]">&amp; Ombre</span>
          </a>
          <span className="hidden sm:inline text-[#3d3854]">•</span>
          <p>© 2026 Encre &amp; Ombre. Tous droits réservés.</p>
        </div>

        {/* Security & Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-wider text-[11px]">
          <a href="#oeuvres" className="hover:text-[#c9a84c] transition-colors">
            Œuvres
          </a>
          <a href="#genres" className="hover:text-[#c9a84c] transition-colors">
            Genres
          </a>
          <a href="#apropos" className="hover:text-[#c9a84c] transition-colors">
            À propos
          </a>
          <a href="#communaute" className="hover:text-[#c9a84c] text-[#e8d49a] transition-colors">
            Communauté
          </a>
          <a href="#contact" className="hover:text-[#c9a84c] transition-colors">
            Contact
          </a>
          {onOpenOfflineGuide && (
            <button
              onClick={onOpenOfflineGuide}
              className="text-[#e8d49a] hover:text-[#c9a84c] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Smartphone className="w-3 h-3 text-[#c9a84c]" />
              <span>Hors-Ligne 24h</span>
            </button>
          )}
          <button
            onClick={onOpenMemberArea}
            className="text-[#c9a84c] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Coffre Sécurisé</span>
          </button>
          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="text-[#dcc074] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#c9a84c]" />
              <span>Espace Auteur</span>
            </button>
          )}
        </div>

        {/* Emergency Lock */}
        <div>
          <button
            onClick={onEmergencyLock}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-900/30 text-[11px] font-medium transition-colors cursor-pointer"
            title="Purger immédiatement les sessions et sécuriser le terminal"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Verrouillage d'urgence</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

