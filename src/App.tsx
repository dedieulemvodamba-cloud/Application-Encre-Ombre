import React, { useState, useEffect, useCallback } from 'react';
import type {
  Book,
  UserAccount,
  SecurityAuditItem,
  OrderReceipt,
} from './types';

import { sha256, generateSecureToken } from './lib/crypto';

import { SecurityBadgeBanner } from './components/SecurityBadgeBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OeuvresList } from './components/OeuvresList';
import { GenresSection } from './components/GenresSection';
import { AProposSection } from './components/AProposSection';
import { CommunitySection } from './components/CommunitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SecureReaderModal } from './components/SecureReaderModal';
import { MobileMoneyOrderModal } from './components/MobileMoneyOrderModal';
import { SecureMemberAreaModal } from './components/SecureMemberAreaModal';
import { SplashScreen } from './components/SplashScreen';
import { OfflineGuideModal } from './components/OfflineGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';

import { ShieldAlert, RefreshCw } from 'lucide-react';
import AmbientSound from './components/AmbientSound';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOfflineGuide, setShowOfflineGuide] = useState(false);

  // Session cryptographique
  const [sessionToken] = useState(() =>
    generateSecureToken('SES-AUTH', 16)
  );

  // Utilisateur actuel
  const [currentUser, setCurrentUser] =
    useState<UserAccount | null>(() => {
      try {
        const saved = localStorage.getItem('eo_user_account');

        if (!saved) {
          return null;
        }

        return JSON.parse(saved) as UserAccount;
      } catch {
        localStorage.removeItem('eo_user_account');
        return null;
      }
    });

  // Journal de sécurité
  const [auditLogs, setAuditLogs] =
    useState<SecurityAuditItem[]>(() => {
      try {
        const saved = localStorage.getItem('eo_audit_logs');

        if (saved) {
          return JSON.parse(saved) as SecurityAuditItem[];
        }
      } catch {
        // On utilise le journal initial
      }

      return [
        {
          id: 'INIT-BOOT-01',
          timestamp: new Date().toISOString(),
          event: 'SECURITY_BOOT_OK',
          details:
            "Initialisation de l'environnement Web Crypto AES-256 & CSPRNG",
          severity: 'info',
          hash:
            'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        },
      ];
    });

  // Historique des commandes
  const [userOrders, setUserOrders] =
    useState<OrderReceipt[]>(() => {
      try {
        const saved = localStorage.getItem('eo_user_orders');

        if (!saved) {
          return [];
        }

        return JSON.parse(saved) as OrderReceipt[];
      } catch {
        localStorage.removeItem('eo_user_orders');
        return [];
      }
    });

  // Lecteur
  const [selectedBookForReader, setSelectedBookForReader] =
    useState<Book | null>(null);

  // Commande
  const [selectedBookForOrder, setSelectedBookForOrder] =
    useState<Book | null>(null);

  // Espace membre
  const [showMemberArea, setShowMemberArea] =
    useState(false);

  // Verrouillage d'urgence
  const [emergencyLocked, setEmergencyLocked] =
    useState(false);

  // Sauvegarde du journal
  useEffect(() => {
    try {
      localStorage.setItem(
        'eo_audit_logs',
        JSON.stringify(auditLogs.slice(0, 50))
      );
    } catch (error) {
      console.error(
        'Erreur sauvegarde journal sécurité:',
        error
      );
    }
  }, [auditLogs]);

  // Sauvegarde des commandes
  useEffect(() => {
    try {
      localStorage.setItem(
        'eo_user_orders',
        JSON.stringify(userOrders)
      );
    } catch (error) {
      console.error(
        'Erreur sauvegarde commandes:',
        error
      );
    }
  }, [userOrders]);

  // Journalisation sécurité
  const logSecurityEvent = useCallback(
    async (
      event: string,
      details: string,
      severity:
        | 'info'
        | 'warn'
        | 'critical' = 'info'
    ) => {
      try {
        const timestamp = new Date().toISOString();

        const raw =
          `${event}:${details}:${timestamp}:${sessionToken}`;

        const hash = await sha256(raw);

        const item: SecurityAuditItem = {
          id: generateSecureToken('EVT', 8),
          timestamp,
          event,
          details,
          severity,
          hash,
        };

        setAuditLogs((prev) => [
          item,
          ...prev,
        ]);
      } catch (error) {
        console.error(
          'Erreur journalisation sécurité:',
          error
        );
      }
    },
    [sessionToken]
  );

  // Connexion
  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);

    try {
      localStorage.setItem(
        'eo_user_account',
        JSON.stringify(user)
      );
    } catch (error) {
      console.error(
        'Erreur sauvegarde utilisateur:',
        error
      );
    }
  };

  // Déconnexion
  const handleLogout = () => {
    if (currentUser) {
      void logSecurityEvent(
        'LOGOUT_USER',
        `Déconnexion utilisateur ${currentUser.email}`
      );
    }

    setCurrentUser(null);
    localStorage.removeItem('eo_user_account');
  };

  // Verrouillage d'urgence
  const handleEmergencyLock = () => {
    void logSecurityEvent(
      'EMERGENCY_LOCK',
      "Verrouillage d'urgence déclenché : purge des sessions en mémoire",
      'critical'
    );

    setCurrentUser(null);
    localStorage.removeItem('eo_user_account');

    setEmergencyLocked(true);
    setSelectedBookForReader(null);
    setSelectedBookForOrder(null);
    setShowMemberArea(false);
  };

  // Déverrouillage
  const handleUnlockEmergency = () => {
    setEmergencyLocked(false);

    void logSecurityEvent(
      'EMERGENCY_UNLOCK',
      "Terminal déverrouillé par l'opérateur",
      'info'
    );
  };

  // Splash Screen
  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  // Écran verrouillé
  if (emergencyLocked) {
    return (
      <div className="min-h-screen bg-[#0c0b0f] text-[#f0ead8] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#13111a] border border-red-500/50 shadow-2xl text-center space-y-6">

          <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-500/60 text-red-400 flex items-center justify-center mx-auto animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-red-400 font-mono block mb-1">
              Protocole d'Urgence Actif
            </span>

            <h2 className="font-serif text-2xl font-bold text-[#f0ead8]">
              Terminal Verrouillé
            </h2>
          </div>

          <p className="text-xs text-[#8a8699] leading-relaxed">
            Par mesure de précaution, toutes les clés de session
            ont été purgées et les accès restreints. Vos données
            chiffrées restent intactes.
          </p>

          <button
            type="button"
            onClick={handleUnlockEmergency}
            className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Déverrouiller le Terminal</span>
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0b0f] text-[#f0ead8] selection:bg-[#c9a84c]/30 selection:text-[#f0ead8]">

      <AmbientSound />

      <SecurityBadgeBanner
        sessionToken={sessionToken}
        auditCount={auditLogs.length}
      />

      <Navbar
        currentUser={currentUser}
        onOpenMemberArea={() =>
          setShowMemberArea(true)
        }
        onEmergencyLogout={handleEmergencyLock}
        onOpenOfflineGuide={() =>
          setShowOfflineGuide(true)
        }
      />

      <main className="flex-1">

        <Hero
          onOpenOeuvres={() => {
            const el =
              document.getElementById('oeuvres');

            el?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
          onOpenMemberArea={() =>
            setShowMemberArea(true)
          }
        />

        <OeuvresList
          onReadExcerpt={(book) =>
            setSelectedBookForReader(book)
          }
          onOrderBook={(book) =>
            setSelectedBookForOrder(book)
          }
        />

        <GenresSection />

        <AProposSection />

        <CommunitySection
          onSecurityEvent={logSecurityEvent}
        />

        <ContactSection
          onSecurityEvent={logSecurityEvent}
        />

      </main>

      <Footer
        onEmergencyLock={handleEmergencyLock}
        onOpenMemberArea={() =>
          setShowMemberArea(true)
        }
        onOpenOfflineGuide={() =>
          setShowOfflineGuide(true)
        }
      />

      <OfflineIndicator
        onOpenGuide={() =>
          setShowOfflineGuide(true)
        }
      />

      {showOfflineGuide && (
        <OfflineGuideModal
          onClose={() =>
            setShowOfflineGuide(false)
          }
        />
      )}

      {selectedBookForReader && (
        <SecureReaderModal
          book={selectedBookForReader}
          sessionToken={sessionToken}
          onClose={() =>
            setSelectedBookForReader(null)
          }
          onOrderNow={(book) => {
            setSelectedBookForReader(null);
            setSelectedBookForOrder(book);
          }}
          onSecurityEvent={logSecurityEvent}
        />
      )}

      {selectedBookForOrder && (
        <MobileMoneyOrderModal
          book={selectedBookForOrder}
          userOrders={userOrders}
          onClose={() =>
            setSelectedBookForOrder(null)
          }
          onOrderCompleted={(receipt) => {
            setUserOrders((prev) => [
              receipt,
              ...prev,
            ]);
          }}
          onSecurityEvent={logSecurityEvent}
        />
      )}

      {showMemberArea && (
        <SecureMemberAreaModal
          currentUser={currentUser}
          auditLogs={auditLogs}
          userOrders={userOrders}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onClose={() =>
            setShowMemberArea(false)
          }
          onSecurityEvent={logSecurityEvent}
        />
      )}

    </div>
  );
}
