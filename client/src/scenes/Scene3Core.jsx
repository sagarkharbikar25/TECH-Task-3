import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Flame, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Scene3Core({ reducedMotion }) {
  const sectionRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const coreSingularityRef = useRef(null);
  const textOverlayRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Pinned zoom timeline for the core reactor
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Zoom rings outward into camera and rotate
      tl.to(ring1Ref.current, { scale: 3.2, rotation: 180, ease: "none" }, 0)
        .to(ring2Ref.current, { scale: 2.5, rotation: -220, ease: "none" }, 0)
        .to(ring3Ref.current, { scale: 2.0, rotation: 140, ease: "none" }, 0)
        .to(coreSingularityRef.current, { scale: 1.8, opacity: 1, ease: "power1.out" }, 0)
        .fromTo(
          textOverlayRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          0.3
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="scene-core"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#05080E] flex items-center justify-center select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#7EAFD0]/20 via-[#00F0FF]/15 to-transparent blur-[120px] pointer-events-none" />

      {/* SVG Ring 1 (Outer Magnetic Torus) */}
      <div
        ref={ring1Ref}
        className="absolute w-[680px] h-[680px] pointer-events-none will-change-transform flex items-center justify-center opacity-60"
      >
        <svg className="w-full h-full text-[#7EAFD0]" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="200" cy="200" r="160" stroke="#00F0FF" strokeWidth="1" strokeDasharray="16 16" />
          <polygon points="200,10 210,30 190,30" fill="currentColor" />
          <polygon points="200,390 210,370 190,370" fill="currentColor" />
          <polygon points="10,200 30,210 30,190" fill="currentColor" />
          <polygon points="390,200 370,210 370,190" fill="currentColor" />
        </svg>
      </div>

      {/* SVG Ring 2 (Mid Confinement Field) */}
      <div
        ref={ring2Ref}
        className="absolute w-[480px] h-[480px] pointer-events-none will-change-transform flex items-center justify-center opacity-70"
      >
        <svg className="w-full h-full text-white" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="2" strokeDasharray="30 8 4 8" />
          <circle cx="150" cy="150" r="110" stroke="#7EAFD0" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* SVG Ring 3 (Inner Gate) */}
      <div
        ref={ring3Ref}
        className="absolute w-[320px] h-[320px] pointer-events-none will-change-transform flex items-center justify-center opacity-80"
      >
        <svg className="w-full h-full text-[#00F0FF]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="3" strokeDasharray="12 4" />
          <circle cx="100" cy="100" r="70" stroke="#7EAFD0" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Core Plasma Singularity Center */}
      <div
        ref={coreSingularityRef}
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#7EAFD0] via-[#00F0FF] to-[#FFFFFF] shadow-[0_0_80px_#00F0FF] flex items-center justify-center animate-pulse-slow"
      >
        <div className="w-20 h-20 rounded-full bg-[#05080E] flex items-center justify-center border border-white/40">
          <Zap className="w-8 h-8 text-white animate-bounce" />
        </div>
      </div>

      {/* Text Overlay HUD */}
      <div
        ref={textOverlayRef}
        className="absolute z-20 text-center px-6 max-w-3xl pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-4 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>[ 03 // FUSION SINGULARITY: ONLINE ]</span>
        </div>

        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-white font-display leading-[0.88] drop-shadow-2xl">
          THE MACHINE CORE
        </h2>

        <p className="mt-4 text-base sm:text-xl text-[#D4E9F7] font-sans font-normal max-w-lg mx-auto drop-shadow-lg">
          The heartbeat of autonomous logic. Powering 14 sub-districts and 60,000 algorithmic nodes without human intervention since 2084.
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 font-mono text-xs text-gray-400">
          <span className="text-[#7EAFD0]">OUTPUT: 84.2 TERAFLOPS</span>
          <span className="text-white/20">•</span>
          <span className="text-white">CORE FREQ: 4.8 THz</span>
        </div>
      </div>
    </section>
  );
}
