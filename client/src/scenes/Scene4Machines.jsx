import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoGrid from "../components/bento/BentoGrid";
import { Wrench, Shield, Bot, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MACHINE_MODULES = [
  {
    id: "MOD-01",
    title: "APEX ROBOWARS ARENA",
    category: "PNEUMATIC COMBAT // 60KG",
    desc: "Reinforced 12mm bulletproof polycarbonate combat ring featuring active hazards, pneumatic flippers, and vertical spin blades.",
    specs: "ARMOR: TITANIUM-GRADE 5 // SPEED: 35 KM/H",
    color: "#7EAFD0"
  },
  {
    id: "MOD-02",
    title: "PLANETARY ROVER SIMULATOR",
    category: "AUTONOMOUS AEROSPACE // ISRO",
    desc: "Full rocker-bogie mobility chassis testing terrain segmentation and computer vision across high-friction basalt trenches.",
    specs: "PAYLOAD: 85 KG // SENSORS: LIDAR + TOF",
    color: "#00F0FF"
  },
  {
    id: "MOD-03",
    title: "NEURAL HAPTIC MATRIX",
    category: "CYBERNETIC INTERFACE",
    desc: "32-channel electrode sensor gloves mapped to digital-twin manipulators for zero-latency heavy mechanical assembly.",
    specs: "LATENCY: 1.2 MS // CHANNELS: 32 EMS",
    color: "#FFFFFF"
  }
];

export default function Scene4Machines({ reducedMotion, onSelectArena }) {
  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      if (!track || !containerRef.current) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div id="scene-machines" className="relative w-full bg-[#070A10]">
      {/* Part A: Pinned Horizontal Showcase */}
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center border-b border-white/10"
      >
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* Section Header */}
        <div className="absolute top-12 left-8 md:left-16 z-20 select-none">
          <div className="flex items-center gap-2 font-mono text-xs text-[#7EAFD0] tracking-widest uppercase mb-1">
            <Wrench className="w-3.5 h-3.5" />
            <span>[ 04 // THE FOUNDRY // FLAGSHIP MODULES ]</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-display tracking-tight">
            HEAVY HARDWARE SYSTEMS
          </h2>
        </div>

        {/* Horizontal Track */}
        <div
          ref={horizontalTrackRef}
          className="flex items-center gap-8 md:gap-12 px-8 md:px-16 w-max pt-16 will-change-transform"
        >
          {MACHINE_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="w-[85vw] sm:w-[65vw] md:w-[50vw] max-w-2xl h-[58vh] min-h-[380px] rounded-3xl bg-[#0E1524]/80 border border-white/10 p-8 md:p-10 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:border-[#7EAFD0]/50 transition-all duration-500 shadow-2xl"
            >
              {/* Glow Accent */}
              <div
                className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[80px] -z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                style={{ backgroundColor: mod.color }}
              />

              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-xs text-[#7EAFD0] tracking-widest">{mod.category}</span>
                  <span className="font-mono text-3xl font-black text-white/20">{mod.id}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display uppercase tracking-tight">
                  {mod.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans font-light">
                  {mod.desc}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-[#7EAFD0] border-t border-white/5 pt-4 mb-4">
                  {mod.specs}
                </div>

                <button
                  onClick={() => onSelectArena && onSelectArena(mod.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#7EAFD0] hover:text-white transition-colors"
                >
                  <span>INSPECT TELEMETRY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part B: Asymmetrical Bento Grid Portfolio of Festival Events */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-28 z-20">
        <BentoGrid onSelectCard={onSelectArena} />
      </section>
    </div>
  );
}
