import React, { useState } from 'react';
import { Shield, User, LogOut, Menu, X, BookOpen, KeyRound, Sparkles, Smartphone } from 'lucide-react';
import { UserAccount } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  currentUser: UserAccount | null;
  onOpenMemberArea: () => void;
  onEmergencyLogout: () => void;
  onOpenOfflineGuide?: () => void;
  onOpenAdminPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenMemberArea,
  onEmergencyLogout,
  onOpenOfflineGuide,
  onOpenAdminPanel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#0c0b0f]/90 backdrop-blur-md border-b border-[#c9a84c]/15 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#c9a84c]/40 group-hover:border-[#c9a84c] transition-colors shrink-0">
            <Logo size={32} />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-black text-[#c9a84c] tracking-wide">
            Encre <span className="font-normal italic text-[#e8d49a]">&amp; Ombre</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest text-[#8a8699]">
          <li>
            <a href="#oeuvres" className="hover:text-[#c9a84c] transition-colors">
              Œuvres
            </a>
          </li>
          <li>
            <a href="#genres" className="hover:text-[#c9a84c] transition-colors">
              Genres
            </a>
          </li>
          <li>
            <a href="#apropos" className="hover:text-[#c9a84c] transition-colors">
              À propos
            </a>
          </li>
          <li>
            <a
              href="#communaute"
              className="text-[#e8d49a] hover:text-[#c9a84c] transition-colors flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3 text-[#c9a84c]" />
              <span>Communauté VIP</span>
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#c9a84c] transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenOfflineGuide && (
            <button
              onClick={onOpenOfflineGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c9a84c]/30 bg-[#1e1b28]/60 hover:bg-[#1e1b28] hover:border-[#c9a84c] text-[#e8d49a] text-xs transition-colors cursor-pointer"
              title="Guide d'installation mobile et mode hors-ligne 24h"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Hors-Ligne 24h</span>
            </button>
          )}

          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#c9a84c]/35 bg-[#1e1b28]/70 hover:bg-[#c9a84c]/15 hover:border-[#c9a84c] text-[#e8d49a] text-xs font-medium tracking-wide transition-all cursor-pointer shadow-sm"
              title="Espace Auteur — Validation des commandes et gestion"
            >
              <Shield className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Espace Auteur</span>
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMemberArea}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#c9a84c]/40 bg-[#1e1b28] hover:border-[#c9a84c] text-[#f0ead8] text-xs transition-colors cursor-pointer"
                title="Accéder au coffre-fort et aux lectures"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-[#c9a84c]">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c9a84c]/20 text-[#e8d49a] uppercase">
                  {currentUser.role}
                </span>
              </button>

              <button
                onClick={onEmergencyLogout}
                className="p-2 rounded-lg border border-red-900/40 bg-[#1e1b28] hover:bg-red-950/40 text-red-400 hover:text-red-300 text-xs transition-colors cursor-pointer"
                title="Verrouillage d'urgence / Déconnexion sécurisée"
                aria-label="Verrouillage d'urgence"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenMemberArea}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c9a84c]/50 bg-[#1e1b28]/60 hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] text-[#c9a84c] text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Espace Lecteur Sécurisé</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenMemberArea}
            className="p-2 text-[#c9a84c] border border-[#c9a84c]/30 rounded-lg"
            aria-label="Espace Membre"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8a8699] hover:text-[#f0ead8]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-[#c9a84c]/15 mt-3 space-y-3">
          <a
            href="#oeuvres"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-2 py-1 text-sm text-[#f0ead8] hover:text-[#c9a84c]"
          >
            Œuvres
          </a>
          <a
            href="#genres"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-2 py-1 text-sm text-[#f0ead8] hover:text-[#c9a84c]"
          >
            Genres
          </a>
          <a
            href="#apropos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-2 py-1 text-sm text-[#f0ead8] hover:text-[#c9a84c]"
          >
            À propos
          </a>
          <a
            href="#communaute"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-2 py-1 text-sm text-[#e8d49a] hover:text-[#c9a84c] font-semibold"
          >
            ✦ Communauté VIP
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-2 py-1 text-sm text-[#f0ead8] hover:text-[#c9a84c]"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-[#3d3854]/40 flex flex-col gap-2">
            {onOpenOfflineGuide && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOfflineGuide();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 border border-[#c9a84c]/30 bg-[#1e1b28] text-[#e8d49a] font-semibold text-xs rounded uppercase tracking-wider"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Mode Hors-Ligne 24h &amp; PWA</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMemberArea();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#c9a84c] text-[#0c0b0f] font-semibold text-xs rounded uppercase tracking-wider"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{currentUser ? 'Mon Coffre-fort' : 'Espace Lecteur'}</span>
            </button>
            {onOpenAdminPanel && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 border border-[#c9a84c]/50 bg-[#1e1b28] text-[#dcc074] font-semibold text-xs rounded uppercase tracking-wider hover:bg-[#c9a84c]/20"
              >
                <Shield className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Espace Auteur</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
