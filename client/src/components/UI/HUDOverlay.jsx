import React from "react";
import { Volume2, VolumeX, Eye } from "lucide-react";
import TechfestLogo from "./TechfestLogo";

export default function HUDOverlay({
  isPlaying,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion
}) {
  return (
    <>
      {/* Top Left Branding */}
      <div className="fixed top-5 left-6 z-40 flex items-center gap-3 select-none">
        <TechfestLogo size={38} />
        <div>
          <div className="font-display text-xl tracking-wider text-white font-black leading-none">
            TECHFEST 2026
          </div>
          <div className="font-mono text-[9px] tracking-widest text-[#7EAFD0] leading-none mt-1">
            DESCENT PROTOCOL
          </div>
        </div>
      </div>

      {/* Bottom Left Controls: Audio & Reduced Motion */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
            isPlaying
              ? "bg-[#7EAFD0]/20 border-[#7EAFD0] text-[#7EAFD0] shadow-[0_0_12px_rgba(126,175,208,0.3)]"
              : "bg-[#08080C]/80 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
          }`}
          aria-label={isPlaying ? "Mute audio drone" : "Enable sci-fi atmospheric drone"}
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "AUDIO ONLINE" : "AUDIO MUTED"}</span>
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
            reducedMotion
              ? "bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]"
              : "bg-[#08080C]/80 border-white/10 text-gray-400 hover:text-white"
          }`}
          title="Toggle high-motion parallax vs accessible static transitions"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{reducedMotion ? "REDUCED MOTION: ON" : "MOTION: FULL"}</span>
        </button>
      </div>

      {/* Subtle Corner HUD Reticles */}
      <div className="fixed top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#7EAFD0]/40 pointer-events-none z-30" />
      <div className="fixed top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#7EAFD0]/40 pointer-events-none z-30" />
      <div className="fixed bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#7EAFD0]/40 pointer-events-none z-30" />
      <div className="fixed bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#7EAFD0]/40 pointer-events-none z-30" />
    </>
  );
}
