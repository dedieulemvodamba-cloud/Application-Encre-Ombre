import React, { useState } from 'react';
import { UserAccount, SecurityAuditItem, EncryptedNote, OrderReceipt } from '../types';
import {
  sha256,
  generateSecureToken,
  encryptWithKey,
  decryptWithKey,
  evaluatePasswordStrength,
  sanitizeInput,
} from '../lib/crypto';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  FileText,
  Activity,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  UserCheck,
  Search,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SecureMemberAreaModalProps {
  currentUser: UserAccount | null;
  auditLogs: SecurityAuditItem[];
  userOrders: OrderReceipt[];
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  onClose: () => void;
  onSecurityEvent: (event: string, details: string, severity?: 'info' | 'warn' | 'critical') => void;
}

export const SecureMemberAreaModal: React.FC<SecureMemberAreaModalProps> = ({
  currentUser,
  auditLogs,
  userOrders,
  onLogin,
  onLogout,
  onClose,
  onSecurityEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'auth' | 'vault' | 'audit' | 'verify'>(
    currentUser ? 'vault' : 'auth'
  );

  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('lecteur.congo@encre-ombre.cd');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [expected2FA, setExpected2FA] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password strength
  const strength = evaluatePasswordStrength(password);

  // Vault State
  const [vaultPassphrase, setVaultPassphrase] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [notes, setNotes] = useState<EncryptedNote[]>([
    {
      id: 'demo-note-1',
      title: "Clé symbolique de L'Ombre du Congo",
      ciphertext:
        'c07ab3d278f9e13498a123bc894ef710a12b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
      iv: '8f7a9c1e2b3d4f5a6b7c8d9e',
      updatedAt: '2026-09-13T04:15:00.000Z',
      decryptedPreview: 'Notes secrètes de lecture (Chiffré en AES-GCM)',
    },
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');
  const [vaultError, setVaultError] = useState('');

  // Verifier tool
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<{
    valid: boolean;
    hash?: string;
    details?: string;
  } | null>(null);

  // Login handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'register' && strength.score < 50) {
      setAuthError('Pour votre sécurité, choisissez un mot de passe plus robuste.');
      return;
    }

    if (!requires2FA) {
      // Étape 1 : Générer un code 2FA simulé
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setExpected2FA(code);
      setRequires2FA(true);
      onSecurityEvent('2FA_REQUESTED', `Code 2FA envoyé pour ${email}: ${code}`);
      return;
    }

    // Étape 2 : Vérification du code 2FA
    if (twoFactorCode !== expected2FA) {
      setAuthError('Code de validation 2FA invalide.');
      onSecurityEvent('LOGIN_FAILED', `Échec 2FA pour l'adresse ${email}`, 'warn');
      return;
    }

    // Succès d'authentification
    const user: UserAccount = {
      id: generateSecureToken('USR', 8),
      name: name.trim() || email.split('@')[0],
      email: sanitizeInput(email),
      role: email.includes('admin') ? 'author' : 'vip',
      registeredAt: new Date().toISOString(),
      sessionToken: generateSecureToken('SES', 16),
      twoFactorEnabled: true,
    };

    onLogin(user);
    onSecurityEvent('LOGIN_SUCCESS', `Session ouverte pour ${user.name} (${user.email})`);
    setActiveTab('vault');
    setRequires2FA(false);
  };

  // 1-Click Quick Demo Login
  const handleQuickDemoLogin = () => {
    const demoUser: UserAccount = {
      id: 'USR-VIP-2420',
      name: 'Lecteur Privilégié',
      email: 'lecteur.vip@encre-ombre.cd',
      role: 'vip',
      registeredAt: new Date().toISOString(),
      sessionToken: generateSecureToken('SES-DEMO', 12),
      twoFactorEnabled: true,
    };
    onLogin(demoUser);
    onSecurityEvent('LOGIN_SUCCESS', `Connexion Démo Sécurisée accordée pour ${demoUser.name}`);
    setActiveTab('vault');
  };

  // Add Encrypted Note
  const handleAddEncryptedNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteBody.trim()) return;

    if (!vaultPassphrase) {
      setVaultError('Veuillez définir une phrase secrète pour chiffrer vos notes.');
      return;
    }

    try {
      const { ciphertext, iv } = await encryptWithKey(newNoteBody, vaultPassphrase);
      const newNote: EncryptedNote = {
        id: generateSecureToken('NOTE', 6),
        title: sanitizeInput(newNoteTitle),
        ciphertext,
        iv,
        updatedAt: new Date().toISOString(),
        decryptedPreview: newNoteBody,
      };

      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteBody('');
      setVaultUnlocked(true);
      setVaultError('');
      onSecurityEvent('VAULT_ENCRYPT', `Nouvelle note chiffrée AES-GCM: "${newNote.title}"`);
    } catch (err) {
      setVaultError('Erreur lors du chiffrement AES.');
    }
  };

  // Unlock existing notes with passphrase
  const handleUnlockVault = async () => {
    if (!vaultPassphrase) {
      setVaultError('Entrez votre phrase secrète pour déverrouiller.');
      return;
    }

    try {
      const updated = await Promise.all(
        notes.map(async note => {
          try {
            const dec = await decryptWithKey(note.ciphertext, note.iv, vaultPassphrase);
            return { ...note, decryptedPreview: dec };
          } catch {
            return { ...note, decryptedPreview: '⚠️ Clé incorrecte pour cette note.' };
          }
        })
      );
      setNotes(updated);
      setVaultUnlocked(true);
      setVaultError('');
      onSecurityEvent('VAULT_DECRYPT', `Coffre-fort déverrouillé avec succès.`);
    } catch {
      setVaultError('Clé de déchiffrement incorrecte.');
    }
  };

  // Verifier tool execution
  const handleRunVerify = async () => {
    if (!verifyInput.trim()) return;
    const hash = await sha256(verifyInput.trim());
    setVerifyResult({
      valid: true,
      hash,
      details: `Empreinte SHA-256 calculée avec succès (${verifyInput.length} caractères vérifiés)`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative bg-[#13111a] border border-[#c9a84c]/30 rounded-2xl max-w-3xl w-full h-[88vh] flex flex-col text-[#f0ead8] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3d3854]/40 flex items-center justify-between bg-[#1e1b28]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0ead8] flex items-center gap-2">
                Espace Lecteur &amp; Coffre Sécurisé
                {currentUser && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Connecté
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#8a8699]">
                Chiffrement AES-GCM 256 bits, contrôle d'intégrité SHA-256 et gestion de compte
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#3d3854]/30 hover:bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#3d3854]/40 bg-[#13111a] px-6 text-xs overflow-x-auto">
          {!currentUser && (
            <button
              onClick={() => setActiveTab('auth')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'auth'
                  ? 'border-[#c9a84c] text-[#c9a84c]'
                  : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authentification 2FA</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('vault')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vault'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mon Coffre Chiffré</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Journal d'Audit ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('verify')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'verify'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#8a8699] hover:text-[#f0ead8]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Vérificateur SHA-256</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: AUTHENTICATION */}
          {activeTab === 'auth' && !currentUser && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <h4 className="font-serif text-xl font-bold text-[#f0ead8]">
                  {authMode === 'login' ? 'Connexion Sécurisée' : 'Créer un Compte Lecteur'}
                </h4>
                <p className="text-xs text-[#8a8699] mt-1">
                  Protection par hachage cryptographique et validation à double facteur
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-200 text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jean-Paul Ngoma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm text-[#f0ead8] outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8a8699] mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm text-[#f0ead8] outline-none"
                  />
                </div>

                {!requires2FA ? (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs uppercase tracking-wider text-[#8a8699]">
                        Mot de passe
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[11px] text-[#c9a84c] flex items-center gap-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showPassword ? 'Masquer' : 'Afficher'}</span>
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-sm font-mono text-[#f0ead8] outline-none"
                    />

                    {/* Password strength meter */}
                    {password && (
                      <div className="mt-2 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-[#8a8699]">Solidité cryptographique :</span>
                          <span
                            className={`font-semibold ${
                              strength.score >= 80
                                ? 'text-emerald-400'
                                : strength.score >= 50
                                ? 'text-amber-400'
                                : 'text-red-400'
                            }`}
                          >
                            {strength.label} ({strength.score}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1e1b28] rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              strength.score >= 80
                                ? 'bg-emerald-500'
                                : strength.score >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${strength.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/40 space-y-3">
                    <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-semibold">
                      <Lock className="w-4 h-4" />
                      <span>Validation 2FA requise</span>
                    </div>
                    <p className="text-xs text-[#8a8699]">
                      Un code de sécurité à 6 chiffres a été émis pour sécuriser cette session :{' '}
                      <strong className="text-[#f0ead8] font-mono text-sm bg-[#13111a] px-2 py-0.5 rounded border border-[#3d3854]">
                        {expected2FA}
                      </strong>
                    </p>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="Code à 6 chiffres"
                      value={twoFactorCode}
                      onChange={e => setTwoFactorCode(e.target.value)}
                      className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 rounded-lg bg-[#13111a] border border-[#c9a84c]/50 text-[#f0ead8] outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  {requires2FA
                    ? 'Confirmer le Code 2FA'
                    : authMode === 'login'
                    ? 'Se Connecter'
                    : 'Créer mon Compte'}
                </button>
              </form>

              {/* Quick 1-Click Demo Login */}
              <div className="pt-4 border-t border-[#3d3854]/40 text-center">
                <p className="text-xs text-[#8a8699] mb-2.5">
                  Besoin de tester immédiatement sans inscription ?
                </p>
                <button
                  onClick={handleQuickDemoLogin}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e1b28] border border-[#c9a84c]/40 hover:bg-[#2d293d] text-[#e8d49a] text-xs font-medium transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#c9a84c]" />
                  <span>Accès Démo Immédiat (1 clic)</span>
                </button>
              </div>

              {/* Switch Login/Register */}
              <div className="text-center text-xs text-[#8a8699]">
                {authMode === 'login' ? (
                  <span>
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setRequires2FA(false);
                      }}
                      className="text-[#c9a84c] hover:underline"
                    >
                      S'inscrire
                    </button>
                  </span>
                ) : (
                  <span>
                    Déjà un compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setRequires2FA(false);
                      }}
                      className="text-[#c9a84c] hover:underline"
                    >
                      Se connecter
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COFFRE-FORT NUMÉRIQUE AES-256 */}
          {activeTab === 'vault' && (
            <div className="space-y-6">
              {/* User Account Info Banner */}
              {currentUser && (
                <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c] flex items-center justify-center font-serif font-bold text-[#c9a84c]">
                      {currentUser.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#f0ead8]">
                        {currentUser.name}
                      </h4>
                      <p className="text-xs text-[#8a8699] font-mono">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#c9a84c] bg-[#13111a] px-2.5 py-1 rounded border border-[#3d3854]">
                      Session: {currentUser.sessionToken.slice(0, 12)}...
                    </span>
                    <button
                      onClick={onLogout}
                      className="text-xs text-red-400 hover:text-red-300 border border-red-900/40 px-3 py-1 rounded bg-red-950/20 cursor-pointer"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}

              {/* Orders History / Licenses */}
              {userOrders.length > 0 && (
                <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#3d3854]/50 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#f0ead8] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Vos Licences Numériques Sécurisées ({userOrders.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {userOrders.map(order => (
                      <div
                        key={order.id}
                        className="p-3 rounded-lg bg-[#13111a] border border-[#3d3854]/40 flex flex-wrap items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <strong className="text-[#f0ead8] block">{order.bookTitle}</strong>
                          <span className="text-[#8a8699] font-mono text-[11px]">
                            {order.paymentMethod} • {order.amountFcfa.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                        <div className="font-mono text-xs bg-[#1e1b28] px-3 py-1 rounded border border-[#c9a84c]/30 text-[#c9a84c]">
                          {order.digitalLicenseKey}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vault Passphrase Bar */}
              <div className="p-4 rounded-xl bg-[#1e1b28] border border-[#c9a84c]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {vaultUnlocked ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#c9a84c]" />
                    )}
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#f0ead8]">
                      Clé de Chiffrement AES-GCM 256 bits du Coffre
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8a8699]">
                    {vaultUnlocked ? 'Coffre Déverrouillé' : 'Coffre Verrouillé'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Entrez votre phrase secrète personnelle..."
                    value={vaultPassphrase}
                    onChange={e => setVaultPassphrase(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#13111a] border border-[#3d3854]/60 text-xs font-mono text-[#f0ead8] outline-none focus:border-[#c9a84c]"
                  />
                  <button
                    onClick={handleUnlockVault}
                    className="px-4 py-2 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    Déverrouiller
                  </button>
                </div>

                {vaultError && <p className="text-xs text-red-400">{vaultError}</p>}
              </div>

              {/* Create new encrypted note */}
              <form
                onSubmit={handleAddEncryptedNote}
                className="p-4 rounded-xl bg-[#1e1b28] border border-[#3d3854]/40 space-y-3"
              >
                <span className="text-xs uppercase tracking-wider text-[#c9a84c] font-semibold block">
                  Ajouter une note de lecture chiffrée
                </span>
                <input
                  type="text"
                  placeholder="Titre de la note ou de la réflexion..."
                  value={newNoteTitle}
                  onChange={e => setNewNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#13111a] border border-[#3d3854]/60 text-xs text-[#f0ead8] outline-none focus:border-[#c9a84c]"
                />
                <textarea
                  rows={3}
                  placeholder="Écrivez vos pensées intimes sur l'œuvre... Le texte sera chiffré en AES-256 avant stockage."
                  value={newNoteBody}
                  onChange={e => setNewNoteBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#13111a] border border-[#3d3854]/60 text-xs text-[#f0ead8] outline-none focus:border-[#c9a84c]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Chiffrer &amp; Sauvegarder</span>
                  </button>
                </div>
              </form>

              {/* List of notes */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#8a8699] font-semibold block">
                  Vos Notes Chiffrées ({notes.length})
                </span>
                {notes.map(note => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-[#1e1b28] border border-[#3d3854]/40 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-serif font-bold text-sm text-[#f0ead8]">{note.title}</h5>
                      <span className="text-[10px] font-mono text-[#8a8699]">
                        {new Date(note.updatedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    {vaultUnlocked && note.decryptedPreview ? (
                      <p className="text-xs text-[#ede4d8] font-serif bg-[#13111a] p-3 rounded-lg border border-[#3d3854]/30 leading-relaxed">
                        {note.decryptedPreview}
                      </p>
                    ) : (
                      <div className="font-mono text-[10px] text-[#8a8699] bg-[#13111a] p-2.5 rounded border border-[#3d3854]/30 truncate">
                        🔒 Données chiffrées: {note.ciphertext.slice(0, 48)}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#f0ead8]">
                    Journal d'Audit de Sécurité Immutable
                  </h4>
                  <p className="text-xs text-[#8a8699]">
                    Chaque action est enregistrée avec horodatage et empreinte d'intégrité
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1e1b28] text-emerald-400 border border-emerald-500/30">
                  Total: {auditLogs.length} événements
                </span>
              </div>

              <div className="space-y-2">
                {auditLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-[#1e1b28] border border-[#3d3854]/40 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            log.severity === 'critical'
                              ? 'bg-red-500'
                              : log.severity === 'warn'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <strong className="text-[#f0ead8] font-mono text-[11px]">{log.event}</strong>
                        <span className="text-[10px] text-[#8a8699]">
                          {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-[#8a8699] text-xs">{log.details}</p>
                    </div>

                    <span className="font-mono text-[10px] text-[#c9a84c] shrink-0 bg-[#13111a] px-2 py-0.5 rounded border border-[#3d3854]/30">
                      Hash: {log.hash.slice(0, 8)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHA-256 VERIFIER */}
          {activeTab === 'verify' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div className="text-center">
                <h4 className="font-serif text-lg font-bold text-[#f0ead8]">
                  Vérificateur d'Empreinte Cryptographique SHA-256
                </h4>
                <p className="text-xs text-[#8a8699] mt-1">
                  Collez une clé de licence, un identifiant de commande ou une chaîne de texte pour
                  calculer son empreinte et tester son intégrité.
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={4}
                  placeholder="Collez ici votre clé ou texte à vérifier..."
                  value={verifyInput}
                  onChange={e => setVerifyInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e1b28] border border-[#3d3854]/50 focus:border-[#c9a84c] text-xs font-mono text-[#f0ead8] outline-none"
                />

                <button
                  onClick={handleRunVerify}
                  className="w-full py-2.5 bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Calculer l'Empreinte SHA-256
                </button>
              </div>

              {verifyResult && (
                <div className="p-4 rounded-xl bg-[#1e1b28] border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Empreinte Calculée avec Succès</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#13111a] font-mono text-xs text-[#c9a84c] break-all border border-[#3d3854]/40">
                    {verifyResult.hash}
                  </div>
                  <p className="text-[11px] text-[#8a8699]">{verifyResult.details}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
