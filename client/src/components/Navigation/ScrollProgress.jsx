import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress({ onProgressChange }) {
  const [progress, setProgress] = useState(0);
  const [depthMeters, setDepthMeters] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = Math.round(self.progress * 100);
        setProgress(p);
        // Map 0-100% to 0 to -8,450 meters depth
        const meters = Math.round(self.progress * 8450);
        setDepthMeters(meters);
        if (onProgressChange) onProgressChange(self.progress);
      }
    });

    return () => trigger.kill();
  }, [onProgressChange]);

  return (
    <>
      {/* Top Precision Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#7EAFD0] via-[#00F0FF] to-[#FFFFFF] shadow-[0_0_12px_#7EAFD0]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top-Right HUD Status Readout */}
      <div className="fixed top-5 right-6 z-40 hidden sm:flex items-center gap-4 font-mono text-xs text-gray-400 bg-[#08080C]/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-[#7EAFD0]">DEPTH:</span>
          <span className="text-white font-bold tabular-nums">-{depthMeters}M</span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[#7EAFD0]">DESCENT:</span>
          <span className="text-white font-bold tabular-nums">{progress}%</span>
        </div>
      </div>
    </>
  );
}
