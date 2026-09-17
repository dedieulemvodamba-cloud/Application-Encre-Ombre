// src/components/AmbientSound.tsx
import { useRef, useState } from "react";

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.35; // reste discret, ajuste si besoin
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/ambiance.mp3" loop />
      <button
        onClick={toggleSound}
        aria-label={playing ? "Couper le son" : "Activer le son"}
        className="fixed bottom-5 right-5 z-[998] flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a24b]/40 bg-[#1c1930]/80 text-[#f3e8d0] backdrop-blur transition hover:border-[#c9a24b]"
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
  import WelcomeIntro from "./components/WelcomeIntro";
import AmbientSound from "./components/AmbientSound";

function App() {
  return (
    <>
      <WelcomeIntro />
      <AmbientSound />
      {/* le reste de ton application ici */}
    </>
  );
}
}
