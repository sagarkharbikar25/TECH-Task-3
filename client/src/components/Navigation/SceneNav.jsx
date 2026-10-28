import React from "react";

const SCENES = [
  { id: "scene-surface", label: "01 SURFACE", depth: "0M" },
  { id: "scene-descent", label: "02 DESCENT", depth: "-2,400M" },
  { id: "scene-core", label: "03 THE CORE", depth: "-5,100M" },
  { id: "scene-machines", label: "04 FOUNDRY", depth: "-7,200M" },
  { id: "scene-exit", label: "05 RE-EMERGENCE", depth: "-8,450M" }
];

export default function SceneNav({ activeScene, lenisRef }) {
  const scrollToScene = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5">
      {SCENES.map((scene, idx) => {
        const isActive = activeScene === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => scrollToScene(scene.id)}
            className="group flex items-center justify-end gap-3 text-right focus:outline-none"
            aria-label={`Jump to ${scene.label}`}
          >
            {/* Hover Tooltip Label */}
            <span
              className={`font-mono text-[11px] tracking-wider transition-all duration-300 ${
                isActive
                  ? "text-[#7EAFD0] font-bold translate-x-0 opacity-100"
                  : "text-gray-500 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {scene.label}
            </span>

            {/* Nav Indicator Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center border ${
                isActive
                  ? "border-[#7EAFD0] bg-[#7EAFD0] shadow-[0_0_12px_#7EAFD0] scale-125"
                  : "border-white/20 bg-transparent group-hover:border-[#7EAFD0]/60 group-hover:scale-110"
              }`}
            >
              {isActive && <div className="w-1 h-1 rounded-full bg-black" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
