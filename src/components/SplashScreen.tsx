import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo-encre-et-ombre.png';
import welcomeAudio from '../assets/bienvenue-lecture.mp3';

interface SplashScreenProps {
  onFinish: () => void;
}

const WELCOME_MESSAGE = "Bienvenue dans l'univers de la lecture.";

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(welcomeAudio);
    audio.preload = 'auto';
    audio.volume = 1;
    audioRef.current = audio;

    const playWelcome = () => {
      if (playedRef.current) return;

      playedRef.current = true;
      audio.currentTime = 0;

      // The bundled MP3 is the primary voice. If the browser blocks
      // autoplay, the first user interaction will retry playback.
      audio.play().catch(() => {
        playedRef.current = false;
      });
    };

    playWelcome();

    const retryOnInteraction = () => {
      if (!playedRef.current) playWelcome();
    };

    window.addEventListener('pointerdown', retryOnInteraction, { once: true });
    window.addEventListener('keydown', retryOnInteraction, { once: true });
    window.addEventListener('touchstart', retryOnInteraction, { once: true });

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 2850);
    const finishTimer = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      onFinish();
    }, 3400);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener('pointerdown', retryOnInteraction);
      window.removeEventListener('keydown', retryOnInteraction);
      window.removeEventListener('touchstart', retryOnInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#08080b] transition-opacity duration-500 ${
        isLeaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Encre & Ombre"
      role="status"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12),transparent_40%)]" />

      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a84c]/10 animate-[pulse_2.8s_ease-in-out_infinite]" />
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a84c]/10" />
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center p-5 sm:p-8">
        <img
          src={logo}
          alt="Encre & Ombre — Littérature sans frontières"
          className="h-auto max-h-[78vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_0_55px_rgba(201,168,76,0.18)] animate-[fadeInScale_1.1s_ease-out_both]"
        />

        <p
          className="mt-5 max-w-[90vw] text-center font-serif text-sm tracking-[0.16em] text-[#f0ead8]/90 opacity-0 animate-[fadeInUp_0.9s_0.7s_ease-out_forwards] sm:text-base"
          aria-live="polite"
        >
          {WELCOME_MESSAGE}
        </p>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10" aria-hidden="true">
          <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9a84c] shadow-[0_0_16px_rgba(201,168,76,0.85)]" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
