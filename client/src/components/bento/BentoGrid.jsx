import React, { useRef } from "react";

export function BentoCard({
  title,
  category,
  description,
  colSpan = "col-span-12 md:col-span-6 lg:col-span-4",
  rowSpan = "row-span-1",
  badge,
  stats,
  actionLabel = "EXPLORE ARENA",
  onClick
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative rounded-2xl bg-[#0E1524]/60 backdrop-blur-xl p-8 border border-white/10 transition-all duration-500 hover:border-transparent overflow-hidden ${colSpan} ${rowSpan}`}
    >
      {/* Dynamic Cursor Spotlight Border Glow using CSS Variables */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(126, 175, 208, 0.45), rgba(0, 240, 255, 0.2), transparent 70%)`
        }}
      />

      {/* Inner Surface Mask */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[15px] bg-[#090E17]/90 transition-colors duration-300 group-hover:bg-[#090E17]/80" />

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Metadata */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#7EAFD0] bg-[#7EAFD0]/10 px-3 py-1 rounded-full border border-[#7EAFD0]/20">
              {category}
            </span>
            {badge && (
              <span className="font-mono text-[10px] text-gray-400 border border-white/10 px-2 py-0.5 rounded tracking-wider">
                {badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight group-hover:text-[#7EAFD0] transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>

        {/* Bottom Status & CTA */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-500 font-medium tracking-wider">
            {stats || "STATUS: ACTIVE"}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#7EAFD0] group-hover:translate-x-1 transition-transform duration-300">
            <span>{actionLabel}</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BentoGrid({ onSelectCard }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-5 auto-rows-[280px]">
        {/* Large Flagship: Robowars */}
        <BentoCard
          title="Apex Robowars 2026"
          category="Combat Robotics"
          badge="PRIZE POOL ₹5,00,000"
          description="High-kinetic 60kg autonomous and remote combat mechs colliding in an airtight reinforced polycarbonate cage."
          colSpan="col-span-12 lg:col-span-8"
          stats="64 BATTLE TEAMS // DAY 02"
          onClick={() => onSelectCard && onSelectCard("Apex Robowars 2026")}
        />

        {/* CyberMesh Hackathon */}
        <BentoCard
          title="CyberMesh 36H Hackathon"
          category="Autonomous Systems"
          badge="GLOBAL TIER"
          description="36 hours non-stop protocol synthesis. Smart contracts, zero-knowledge agents, and generative edge infrastructure."
          colSpan="col-span-12 md:col-span-6 lg:col-span-4"
          stats="HYBRID: VIRTUAL & ONSITE"
          onClick={() => onSelectCard && onSelectCard("CyberMesh 36H Hackathon")}
        />

        {/* Neural Conclave */}
        <BentoCard
          title="Neural Conclave"
          category="Global Keynotes"
          badge="HALL OF MATRICES"
          description="Pioneers from DeepMind, MIT, and CERN debating post-silicon compute and human-machine symbiotic networks."
          colSpan="col-span-12 md:col-span-6 lg:col-span-4"
          stats="OCT 24 // 14:00 IST"
          onClick={() => onSelectCard && onSelectCard("Neural Conclave")}
        />

        {/* FPV Sub-Zero Drone Racing */}
        <BentoCard
          title="FPV Drone Racing"
          category="Aerospace"
          badge="NIGHT CIRCUIT"
          description="High-G precision micro-drones weaving through glowing obstacle gates with live VR cockpit broadcast."
          colSpan="col-span-12 md:col-span-6 lg:col-span-4"
          stats="200 KM/H SPEED RUN"
          onClick={() => onSelectCard && onSelectCard("FPV Drone Racing")}
        />

        {/* Quantum Cryptography Lab */}
        <BentoCard
          title="Quantum Cryptography"
          category="Hands-on Workshop"
          badge="LIMITED SEATS"
          description="Real-world quantum key distribution (QKD) simulator testing photon polarization on IBM Q hardware."
          colSpan="col-span-12 md:col-span-6 lg:col-span-4"
          stats="CERTIFIED SESSIONS"
          onClick={() => onSelectCard && onSelectCard("Quantum Cryptography")}
        />
      </div>
    </div>
  );
}
