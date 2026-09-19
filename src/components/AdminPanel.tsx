import React, { useEffect, useState } from 'react';
import { X, Lock, KeyRound, Copy, Check, RefreshCw, CheckCircle2, ClipboardList, LogOut, Loader2 } from 'lucide-react';
import { STORIES } from '../data/stories';
import { generateUnlockCode } from '../lib/purchases';
import { listPendingOrders, validateOrder, OrderRecord } from '../lib/orders';
import { signIn, signOut, watchAuthState } from '../lib/auth';
import type { User } from 'firebase/auth';

interface AdminPanelProps {
  onClose: () => void;
}

type Tab = 'orders' | 'code';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('orders');

  useEffect(() => {
    const unsubscribe = watchAuthState((u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoggingIn(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      console.error('Erreur de connexion :', err);
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoggingIn(false);
    }
  };

  const unlocked = !!user;

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [validatedIds, setValidatedIds] = useState<string[]>([]);

  const [selectedStoryId, setSelectedStoryId] = useState(STORIES[0]?.id ?? '');
  const [copied, setCopied] = useState(false);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const pending = await listPendingOrders();
      setOrders(pending);
    } catch (err) {
      console.error('Erreur chargement commandes :', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (unlocked && tab === 'orders') {
      loadOrders();
    }
  }, [unlocked, tab]);

  const handleValidate = async (order: OrderRecord) => {
    if (!order.id) return;
    setValidatingId(order.id);
    try {
      await validateOrder(order);
      setValidatedIds((prev) => [...prev, order.id!]);
    } catch (err) {
      console.error('Erreur validation commande :', err);
    } finally {
      setValidatingId(null);
    }
  };

  const code = selectedStoryId ? generateUnlockCode(selectedStoryId) : '';
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1c1930] border border-[#c9a24b]/25 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/20 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-[#f3e8d0]" />
        </button>

        {!authChecked ? (
          <div className="py-10 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#c9a24b]" />
          </div>
        ) : !unlocked ? (
          <form onSubmit={handleLogin} className="pt-2">
            <Lock className="w-8 h-8 mx-auto mb-4 text-[#c9a24b] opacity-80" />
            <h3 className="text-center text-[#f3e8d0] font-medium mb-4">Espace auteur</h3>
            <input
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="Email"
              className="w-full px-4 py-3 mb-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] text-sm focus:outline-none focus:border-[#c9a24b]"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 mb-3 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] text-sm focus:outline-none focus:border-[#c9a24b]"
            />
            {error && (
              <p className="text-xs text-[#7a2331] text-center mb-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded bg-[#c9a24b] text-[#14121b] text-sm font-semibold uppercase tracking-wider hover:bg-[#dcc074] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Se connecter</span>}
            </button>
          </form>
        ) : (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7c778f]">{user?.email}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs text-[#a9a4b8] hover:text-[#dcc074] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Déconnexion
              </button>
            </div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('orders')}
                className={`flex-1 text-xs py-2 rounded border transition-colors flex items-center justify-center gap-1.5 ${
                  tab === 'orders'
                    ? 'border-[#c9a24b] text-[#dcc074] bg-[#c9a24b]/10'
                    : 'border-[#c9a24b]/20 text-[#a9a4b8]'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                Commandes
              </button>
              <button
                onClick={() => setTab('code')}
                className={`flex-1 text-xs py-2 rounded border transition-colors flex items-center justify-center gap-1.5 ${
                  tab === 'code'
                    ? 'border-[#c9a24b] text-[#dcc074] bg-[#c9a24b]/10'
                    : 'border-[#c9a24b]/20 text-[#a9a4b8]'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                Code manuel
              </button>
            </div>

            {tab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#f3e8d0] font-medium text-sm">Commandes en attente</h3>
                  <button
                    onClick={loadOrders}
                    className="p-1.5 rounded border border-[#c9a24b]/25 hover:border-[#c9a24b] transition-colors"
                    title="Rafraîchir"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#a9a4b8] ${loadingOrders ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {loadingOrders && (
                  <p className="text-xs text-[#7c778f] text-center py-6">Chargement…</p>
                )}

                {!loadingOrders && orders.length === 0 && (
                  <p className="text-xs text-[#7c778f] text-center py-6">
                    Aucune commande en attente pour le moment.
                  </p>
                )}

                <div className="space-y-3">
                  {orders.map((order) => {
                    const isValidated = order.id ? validatedIds.includes(order.id) : false;
                    return (
                      <div
                        key={order.id}
                        className="rounded-xl border border-[#c9a24b]/20 bg-[#14121b] p-4"
                      >
                        <p className="text-sm text-[#f3e8d0] font-medium mb-1">{order.storyTitle}</p>
                        <p className="text-xs text-[#a9a4b8]">
                          {order.buyerName} — {order.buyerPhone}
                        </p>
                        <p className="text-xs text-[#7c778f] mb-3">
                          {order.price} FCFA · {order.method}
                        </p>
                        {isValidated ? (
                          <p className="text-xs text-[#dcc074] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Validé — l'acheteur peut récupérer son livre
                          </p>
                        ) : (
                          <button
                            onClick={() => handleValidate(order)}
                            disabled={validatingId === order.id}
                            className="w-full py-2 rounded bg-[#c9a24b] text-[#14121b] text-xs font-semibold uppercase tracking-wider hover:bg-[#dcc074] transition-colors disabled:opacity-60"
                          >
                            {validatingId === order.id ? 'Validation…' : 'Valider le paiement'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'code' && (
              <div>
                <KeyRound className="w-8 h-8 mx-auto mb-4 text-[#c9a24b] opacity-80" />
                <h3 className="text-center text-[#f3e8d0] font-medium mb-5">
                  Générer un code de secours
                </h3>
                <label className="block text-xs text-[#a9a4b8] mb-2">Livre</label>
                <select
                  value={selectedStoryId}
                  onChange={(e) => setSelectedStoryId(e.target.value)}
                  className="w-full px-4 py-3 mb-5 rounded bg-[#14121b] border border-[#c9a24b]/25 text-[#f3e8d0] text-sm focus:outline-none focus:border-[#c9a24b]"
                >
                  {STORIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between rounded-xl border border-[#c9a24b]/25 bg-[#14121b] p-4">
                  <span className="text-2xl font-mono tracking-[0.3em] text-[#dcc074]">{code}</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded border border-[#c9a24b]/25 hover:border-[#c9a24b] transition-colors"
                    title="Copier le code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#dcc074]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#a9a4b8]" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#7c778f] mt-4 text-center">
                  À utiliser seulement si Internet n'est pas disponible côté acheteur — sinon,
                  privilégie l'onglet Commandes.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
