import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TechfestLogo from "../UI/TechfestLogo";

const GLYPHS = "0123456789ABCDEF_//<>[]!@#$%^&*~";
const STATUS_LOGS = [
  "INITIALIZING QUANTUM CORE...",
  "ESTABLISHING NEURAL LINK...",
  "ALLOCATING VIRTUAL BUFFERS...",
  "SYNCHRONIZING DESCENT MESH...",
  "SYSTEMS ONLINE. ACCESS GRANTED."
];

export default function CustomPreloader({ onLoadingComplete }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const counterRef = useRef(null);
  const statusRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState(STATUS_LOGS[0]);

  const scrambleText = (finalText) => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return finalText[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= finalText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 24);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onLoadingComplete) onLoadingComplete();
            }
          });

          exitTl
            .to(statusRef.current, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" })
            .to(counterRef.current, { scale: 1.08, opacity: 0, duration: 0.45, ease: "power3.in" }, "-=0.2")
            .to(leftPanelRef.current, {
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              duration: 1.1,
              ease: "expo.inOut"
            })
            .to(rightPanelRef.current, {
              clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              duration: 1.1,
              ease: "expo.inOut"
            }, "<")
            .set(containerRef.current, { display: "none" });
        }
      });

      tl.to(counterObj, {
        value: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = Math.floor(counterObj.value);
          setProgress(current);

          if (current === 25) scrambleText(STATUS_LOGS[1]);
          if (current === 55) scrambleText(STATUS_LOGS[2]);
          if (current === 85) scrambleText(STATUS_LOGS[3]);
          if (current === 100) scrambleText(STATUS_LOGS[4]);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden"
    >
      {/* Curtain Panels with Clip-Path Transition */}
      <div
        ref={leftPanelRef}
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        className="absolute inset-0 w-1/2 h-full bg-[#08080C] border-r border-[#7EAFD0]/30 shadow-2xl"
      />
      <div
        ref={rightPanelRef}
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        className="absolute inset-0 left-1/2 w-1/2 h-full bg-[#08080C] border-l border-[#7EAFD0]/30 shadow-2xl"
      />

      {/* Center Cybernetic HUD Display */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <TechfestLogo size={56} className="mb-4 animate-pulse-slow" />
        <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-[0.3em] text-[#7EAFD0] uppercase">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
          <span>TECHFEST PROTOCOL // 2026</span>
        </div>

        {/* Massive Bebas Neue Counter */}
        <h1
          ref={counterRef}
          className="text-8xl md:text-9xl font-black tracking-tighter text-white font-display tabular-nums"
        >
          {String(progress).padStart(3, "0")}
          <span className="text-4xl text-[#7EAFD0] font-mono ml-2">%</span>
        </h1>

        {/* Text Scrambler Readout */}
        <p
          ref={statusRef}
          className="mt-4 font-mono text-xs md:text-sm text-gray-400 tracking-widest uppercase h-6"
        >
          {displayText}
        </p>

        {/* Progress Track in Sky Blue & Neon */}
        <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full mt-6 overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#7EAFD0] via-[#00F0FF] to-[#FFFFFF] transition-all duration-75 ease-out shadow-[0_0_15px_#7EAFD0]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
