import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, ShieldAlert, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Scene2Descent({ reducedMotion }) {
  const containerRef = useRef(null);
  const cableLeftRef = useRef(null);
  const cableRightRef = useRef(null);
  const textBlockRef = useRef(null);
  const meterRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Differential vertical speed on cables & conduits
      gsap.to(cableLeftRef.current, {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(cableRightRef.current, {
        y: -480,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text reveal animation
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 25%",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="scene-descent"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 overflow-hidden bg-gradient-to-b from-[#0A121F] via-[#070D17] to-[#05080E] flex items-center justify-center text-white"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Vertical Data Cables Left */}
      <div
        ref={cableLeftRef}
        className="absolute left-6 md:left-24 top-0 w-16 h-[180%] flex justify-between pointer-events-none opacity-40"
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-[#7EAFD0] via-[#00F0FF] to-transparent shadow-[0_0_8px_#7EAFD0]" />
        <div className="w-[2px] h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-[#7EAFD0]/40 via-transparent to-transparent" />
      </div>

      {/* Vertical Data Cables Right */}
      <div
        ref={cableRightRef}
        className="absolute right-6 md:right-24 top-0 w-20 h-[220%] flex justify-around pointer-events-none opacity-40"
      >
        <div className="w-[2px] h-full bg-gradient-to-b from-[#00F0FF] via-[#7EAFD0] to-transparent shadow-[0_0_8px_#00F0FF]" />
        <div className="w-[1px] h-full bg-gradient-to-b from-white/10 to-transparent" />
        <div className="w-[3px] h-full bg-gradient-to-b from-[#7EAFD0]/30 to-transparent" />
      </div>

      {/* Main Narrative Content Container */}
      <div
        ref={textBlockRef}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center select-none"
      >
        {/* Stage Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7EAFD0]/10 border border-[#7EAFD0]/20 text-[#7EAFD0] font-mono text-xs tracking-widest uppercase mb-6">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>[ 02 // SUBTERRANEAN PLUNGE ]</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight font-display leading-[0.9]">
          BENEATH THE STRATA, <br />
          <span className="text-[#7EAFD0] text-glow-sky">THE STEEL AWAKENS</span>
        </h2>

        {/* Telemetry Bar */}
        <div className="my-8 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-2 bg-[#0E1524] px-4 py-2 rounded-xl border border-white/5">
            <Cpu className="w-4 h-4 text-[#00F0FF]" />
            <span>DEPTH: <strong className="text-white">-2,400M</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-[#0E1524] px-4 py-2 rounded-xl border border-white/5">
            <ShieldAlert className="w-4 h-4 text-[#7EAFD0]" />
            <span>ATM PRESSURE: <strong className="text-white">18.4 ATM</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-[#0E1524] px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>COOLANT GRID: <strong className="text-emerald-400">OPTIMAL</strong></span>
          </div>
        </div>

        {/* Narrative Copy */}
        <p className="text-base sm:text-xl text-gray-300 font-sans leading-relaxed max-w-2xl mx-auto font-light">
          Gigawatt conduit arteries pulse beneath the crust. Millions of sub-nodes operate silently in perpetual synchronization, maintaining the cybernetic ecosystem for the upcoming assembly.
        </p>

        {/* Graphic Conduit Ring SVG */}
        <div className="mt-12 flex justify-center opacity-60">
          <svg className="w-64 h-24 text-[#7EAFD0]" viewBox="0 0 300 80" fill="none">
            <line x1="0" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="150" cy="40" r="28" stroke="currentColor" strokeWidth="2" />
            <circle cx="150" cy="40" r="14" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="150" cy="40" r="4" fill="#FFFFFF" />
            <line x1="190" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
