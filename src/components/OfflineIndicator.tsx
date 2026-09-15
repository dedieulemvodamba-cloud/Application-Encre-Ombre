import React, { useState, useEffect } from 'react';
import { WifiOff, Sparkles, Smartphone } from 'lucide-react';

interface OfflineIndicatorProps {
  onOpenGuide: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ onOpenGuide }) => {
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

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-[#1e1b28]/95 border border-[#c9a84c]/50 px-3.5 py-2 text-xs font-medium text-[#f0ead8] shadow-2xl backdrop-blur-md animate-bounce">
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c9a84c]" />
      </span>
      <WifiOff className="w-3.5 h-3.5 text-[#c9a84c]" />
      <span>Mode Hors-Ligne 24h Actif — Données en cache</span>
      <button
        onClick={onOpenGuide}
        className="ml-1 text-[11px] underline text-[#c9a84c] hover:text-[#e8d49a] cursor-pointer"
      >
        Guide
      </button>
    </div>
  );
};
