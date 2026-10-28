import React from "react";

export default function TechfestLogo({ size = 36, className = "", withGlow = true }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Subtle Glow Blur Backdrop */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 bg-gradient-to-tr from-[#7EAFD0] to-[#00F0FF] pointer-events-none"
        />
      )}

      {/* SVG Emblem */}
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="logoSkyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#7EAFD0" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="logoMetal" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0E1726" />
            <stop offset="100%" stopColor="#223652" />
          </linearGradient>
        </defs>

        {/* Outer Isometric Hexagon */}
        <polygon
          points="256,40 436,144 436,368 256,472 76,368 76,144"
          stroke="#7EAFD0"
          strokeWidth="6"
          strokeDasharray="24 12"
          fill="url(#logoMetal)"
          fillOpacity="0.85"
        />

        {/* Inner Precision Ticker Ring */}
        <circle
          cx="256"
          cy="256"
          r="135"
          stroke="#7EAFD0"
          strokeWidth="5"
          strokeDasharray="28 14 8 14"
        />

        {/* Turbine Blades / Quantum Monogram */}
        <path d="M256,120 L350,174 L310,244 L256,212 Z" fill="url(#logoSkyGrad)" />
        <path d="M350,338 L256,392 L256,330 L310,298 Z" fill="#7EAFD0" fillOpacity="0.9" />
        <path d="M162,174 L256,120 L256,182 L202,214 Z" fill="#FFFFFF" />
        <path d="M162,338 L202,268 L256,300 L256,392 Z" fill="url(#logoSkyGrad)" />

        {/* Central Singularity Diamond */}
        <polygon
          points="256,220 292,256 256,292 220,256"
          fill="#08080C"
          stroke="#00F0FF"
          strokeWidth="6"
        />
        <circle cx="256" cy="256" r="10" fill="#FFFFFF" />

        {/* Coordinate Crosshairs */}
        <line x1="256" y1="20" x2="256" y2="40" stroke="#7EAFD0" strokeWidth="6" />
        <line x1="256" y1="472" x2="256" y2="492" stroke="#7EAFD0" strokeWidth="6" />
        <line x1="58" y1="256" x2="78" y2="256" stroke="#7EAFD0" strokeWidth="6" />
        <line x1="434" y1="256" x2="454" y2="256" stroke="#7EAFD0" strokeWidth="6" />
      </svg>
    </div>
  );
}
