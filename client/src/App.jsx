import React, { useState, useEffect, useRef } from "react";
import { initScroll, ScrollTrigger } from "./lib/gsap";
import { useAudio } from "./hooks/useAudio";
import { useReducedMotion } from "./hooks/useReducedMotion";
import CustomPreloader from "./components/preloader/CustomPreloader";
import ScrollProgress from "./components/Navigation/ScrollProgress";
import SceneNav from "./components/Navigation/SceneNav";
import HUDOverlay from "./components/UI/HUDOverlay";
import ArenaModal from "./components/UI/ArenaModal";

import Scene1Surface from "./scenes/Scene1Surface";
import Scene2Descent from "./scenes/Scene2Descent";
import Scene3Core from "./scenes/Scene3Core";
import Scene4Machines from "./scenes/Scene4Machines";
import Scene5Exit from "./scenes/Scene5Exit";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeScene, setActiveScene] = useState("scene-surface");
  const [selectedArena, setSelectedArena] = useState(null);
  const [manualReducedMotion, setManualReducedMotion] = useState(false);

  const lenisInstanceRef = useRef(null);
  const systemReducedMotion = useReducedMotion();
  const effectiveReducedMotion = manualReducedMotion || systemReducedMotion;

  const { isPlaying, toggleSound, playClick, updateDepthResonance } = useAudio();

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    if (loading) return;

    const scrollSetup = initScroll();
    lenisInstanceRef.current = scrollSetup.lenis;

    // Register active scene triggers
    const scenes = ["scene-surface", "scene-descent", "scene-core", "scene-machines", "scene-exit"];
    const triggers = scenes.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => setActiveScene(id),
        onEnterBack: () => setActiveScene(id),
      });
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      scrollSetup.destroy();
    };
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleProgressChange = (progress) => {
    updateDepthResonance(progress);
  };

  const handleSelectArena = (arenaTitle) => {
    playClick();
    setSelectedArena(arenaTitle);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#08080C] text-white selection:bg-[#7EAFD0] selection:text-black">
      {/* Splash Screen / Custom Preloader */}
      {loading && <CustomPreloader onLoadingComplete={handleLoadingComplete} />}

      {/* Global Fixed HUD & Navigations */}
      <ScrollProgress onProgressChange={handleProgressChange} />
      <HUDOverlay
        isPlaying={isPlaying}
        onToggleSound={toggleSound}
        reducedMotion={effectiveReducedMotion}
        onToggleReducedMotion={() => setManualReducedMotion(!manualReducedMotion)}
      />
      <SceneNav activeScene={activeScene} lenisRef={lenisInstanceRef} />

      {/* Main 5-Scene Parallax Sequence */}
      <main className="relative w-full">
        {/* Scene 1: The Surface (Exosphere) */}
        <Scene1Surface reducedMotion={effectiveReducedMotion} />

        {/* Scene 2: The Descent (Subterranean Cable Web) */}
        <Scene2Descent reducedMotion={effectiveReducedMotion} />

        {/* Scene 3: The Machine Core (Singularity Zoom) */}
        <Scene3Core reducedMotion={effectiveReducedMotion} />

        {/* Scene 4: The Foundry & Arena Showcase (Pinned Slider + Bento Grid) */}
        <Scene4Machines
          reducedMotion={effectiveReducedMotion}
          onSelectArena={handleSelectArena}
        />

        {/* Scene 5: Ascent & Experience Feedback Console */}
        <Scene5Exit />
      </main>

      {/* Interactive Arena Modal */}
      <ArenaModal
        arenaTitle={selectedArena}
        onClose={() => setSelectedArena(null)}
      />
    </div>
  );
}
