import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 180 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 680 680"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <rect width="680" height="680" fill="#0c0b0f" rx="24" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />
        
        {/* Corner Accents */}
        <line x1="40" y1="40" x2="80" y2="40" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="40" y1="40" x2="40" y2="80" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="600" y1="40" x2="640" y2="40" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="640" y1="40" x2="640" y2="80" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="40" y1="640" x2="80" y2="640" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="40" y1="600" x2="40" y2="640" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="600" y1="640" x2="640" y2="640" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="640" y1="600" x2="640" y2="640" stroke="#c9a84c" strokeWidth="1.5" />
        
        {/* Geometric Rings */}
        <circle cx="340" cy="290" r="160" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
        <circle cx="340" cy="290" r="148" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.4" />
        
        {/* Crosshair marks */}
        <g stroke="#c9a84c" strokeWidth="1.2" opacity="0.6">
          <line x1="340" y1="128" x2="340" y2="140" />
          <line x1="340" y1="440" x2="340" y2="452" />
          <line x1="178" y1="290" x2="190" y2="290" />
          <line x1="490" y1="290" x2="502" y2="290" />
          <line x1="226" y1="178" x2="234" y2="186" />
          <line x1="446" y1="178" x2="454" y2="186" />
          <line x1="226" y1="402" x2="234" y2="394" />
          <line x1="446" y1="402" x2="454" y2="394" />
        </g>
        
        {/* Quill / Pen Nib Motif */}
        <path
          d="M340 175 C355 200 370 235 355 275 C345 305 335 320 340 345 L335 345 C330 320 320 305 310 275 C295 235 310 200 325 175 Z"
          fill="#c9a84c"
        />
        <path
          d="M340 175 C355 200 370 235 355 275 C348 300 340 318 340 345 L340 175 Z"
          fill="#7a6020"
          opacity="0.5"
        />
        <line x1="340" y1="175" x2="340" y2="345" stroke="#0c0b0f" strokeWidth="1.2" />
        <line x1="325" y1="215" x2="313" y2="225" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="320" y1="232" x2="305" y2="242" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="316" y1="250" x2="302" y2="260" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="315" y1="268" x2="304" y2="276" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="355" y1="215" x2="367" y2="225" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="360" y1="232" x2="375" y2="242" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="364" y1="250" x2="378" y2="260" stroke="#0c0b0f" strokeWidth="0.7" />
        <line x1="365" y1="268" x2="376" y2="276" stroke="#0c0b0f" strokeWidth="0.7" />
        
        <path d="M340 345 C337 355 334 362 340 372 C346 362 343 355 340 345 Z" fill="#c9a84c" />
        
        {/* Stars */}
        <polygon points="340,112 342,118 348,118 343,122 345,128 340,124 335,128 337,122 332,118 338,118" fill="#c9a84c" opacity="0.8" />
        <polygon points="200,220 201,224 205,224 202,226 203,230 200,228 197,230 198,226 195,224 199,224" fill="#c9a84c" opacity="0.6" />
        <polygon points="480,220 481,224 485,224 482,226 483,230 480,228 477,230 478,226 475,224 479,224" fill="#c9a84c" opacity="0.6" />
        
        {/* Divider lines */}
        <line x1="120" y1="470" x2="252" y2="470" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />
        <line x1="428" y1="470" x2="560" y2="470" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />
        <circle cx="340" cy="470" r="3" fill="#c9a84c" opacity="0.8" />
        
        {/* Typography */}
        <text x="340" y="510" textAnchor="middle" fontSize="44px" fill="#f0ead8" fontFamily="Georgia, serif" letterSpacing="10" fontWeight="700">
          ENCRE
        </text>
        <text x="340" y="548" textAnchor="middle" fontSize="28px" fill="#c9a84c" fontFamily="Georgia, serif" fontStyle="italic">
          &amp;
        </text>
        <text x="340" y="586" textAnchor="middle" fontSize="44px" fill="#f0ead8" fontFamily="Georgia, serif" letterSpacing="10" fontWeight="700">
          OMBRE
        </text>
        <text x="340" y="618" textAnchor="middle" fontSize="11px" fill="#8a8699" fontFamily="Georgia, serif" letterSpacing="4">
          LITTÉRATURE SANS FRONTIÈRES
        </text>
        <line x1="160" y1="632" x2="280" y2="632" stroke="#c9a84c" strokeWidth="0.6" opacity="0.5" />
        <line x1="400" y1="632" x2="520" y2="632" stroke="#c9a84c" strokeWidth="0.6" opacity="0.5" />
        <circle cx="340" cy="632" r="2" fill="#c9a84c" opacity="0.6" />
      </svg>
    </div>
  );
};
