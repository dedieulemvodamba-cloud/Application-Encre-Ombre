// src/components/WelcomeIntro.tsx
import { useEffect, useState } from "react";

export default function WelcomeIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const removeTimer = setTimeout(() => setShow(false), 4400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[#14121b] px-6 transition-opacity duration-[1200ms] ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/logo.png"
        alt="Encre & Ombre"
        className="w-24 h-24 md:w-28 md:h-28"
      />
      <p
        className="max-w-md text-center italic text-[#f3e8d0]"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(1.25rem, 3vw, 1.9rem)",
          lineHeight: 1.6,
        }}
      >
        Il y a des histoires qui attendent la nuit pour se raconter.
        <br />
        Entrez doucement — celle-ci vous attendait peut-être.
      </p>
    </div>
  );
}import WelcomeIntro from "./components/WelcomeIntro";

function App() {
  return (
    <>
      <WelcomeIntro />
      {/* le reste de ton application ici */}
    </>
  );
}
