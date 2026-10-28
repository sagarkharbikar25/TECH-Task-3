import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import HeroCanvas from "../components/canvas/HeroCanvas";
import ParallaxLayer from "../components/Parallax/ParallaxLayer";
import { ChevronDown, Compass, Radio } from "lucide-react";

export default function Scene1Surface({ reducedMotion }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mouseCoordsRef = useRef([0, 0]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Mouse move 3D tilt dampening
      const xTo = gsap.quickTo(titleRef.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(titleRef.current, "y", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const normX = (clientX / innerWidth - 0.5) * 35;
        const normY = (clientY / innerHeight - 0.5) * 25;
        mouseCoordsRef.current = [(clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1];
        xTo(normX);
        yTo(normY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="scene-surface"
      ref={heroRef}
      className="relative w-full h-[120vh] min-h-[750px] overflow-hidden bg-gradient-to-b from-[#7EAFD0] via-[#2F5374] to-[#0A121F] flex items-center justify-center"
    >
      {/* Background Star Dust & Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Layer 1: Distant Cloud Strata (SVG) */}
      <ParallaxLayer speed={-0.25} className="flex items-end justify-center">
        <svg
          className="w-full h-auto min-w-[1200px] opacity-40"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,112C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fill="url(#cloudGrad)"
          />
          <defs>
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7EAFD0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* Layer 2: Distant Megalith Skyline Silhouette */}
      <ParallaxLayer speed={0.2} className="flex items-end justify-center">
        <svg
          className="w-full h-80 min-w-[1200px] opacity-30 text-[#09111D]"
          viewBox="0 0 1200 400"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <polygon points="50,400 50,150 90,150 90,400" />
          <polygon points="110,400 110,100 140,80 170,100 170,400" />
          <polygon points="210,400 210,220 270,220 270,400" />
          <polygon points="310,400 310,90 350,90 350,400" />
          <polygon points="380,400 380,180 430,180 430,400" />
          <polygon points="500,400 500,60 520,30 540,60 540,400" />
          <polygon points="620,400 620,130 670,130 670,400" />
          <polygon points="720,400 720,200 780,200 780,400" />
          <polygon points="850,400 850,80 890,80 890,400" />
          <polygon points="940,400 940,160 1000,160 1000,400" />
          <polygon points="1050,400 1050,110 1100,110 1100,400" />
        </svg>
      </ParallaxLayer>

      {/* Layer 3: 3D Interactive WebGL Quantum Core */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <HeroCanvas mousePosition={mouseCoordsRef.current} />
      </div>

      {/* Layer 4: Monumental Display Typography (Sky Blue & White from ref) */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pointer-events-auto select-none">
        {/* Sci-Fi Meta Tag */}
        <div
          ref={subtitleRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs tracking-[0.25em] mb-6 uppercase"
        >
          <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
          <span>TECHFEST 2026 // CA EXPERIENCE</span>
        </div>

        {/* Tall Bebas Display Title */}
        <div ref={titleRef} className="will-change-transform">
          <h1 className="text-7xl sm:text-9xl md:text-[11rem] font-black uppercase tracking-tight text-white font-display leading-[0.88] drop-shadow-2xl">
            DESCENT
          </h1>
          <div className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-[#7EAFD0] font-display mt-2 text-glow-sky">
            INTO THE CITY OF MACHINES
          </div>
        </div>

        {/* Narrative Teaser */}
        <p className="mt-8 text-base sm:text-lg text-[#D4E9F7] font-sans max-w-xl mx-auto font-normal leading-relaxed drop-shadow">
          A scroll-driven journey through 5 subterranean depths. Five tiers of autonomous logic, kinetic combat, and neon architecture.
        </p>

        {/* Action Button & Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#scene-descent"
            className="px-8 py-3.5 rounded-full bg-white text-[#0A121F] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#7EAFD0] hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            INITIATE DIVE
          </a>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#D4E9F7] tracking-widest uppercase animate-bounce mt-4">
            <ChevronDown className="w-4 h-4 text-[#7EAFD0]" />
            <span>SCROLL TO DESCEND</span>
          </div>
        </div>
      </div>

      {/* Layer 5: Foreground Catwalk Silhouette */}
      <ParallaxLayer speed={0.45} className="flex items-end justify-center pointer-events-none">
        <div className="w-full h-24 bg-gradient-to-t from-[#0A121F] via-[#0A121F]/80 to-transparent" />
      </ParallaxLayer>
    </section>
  );
}
