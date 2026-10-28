import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, ShieldAlert, CheckCircle2, Calendar, MapPin, Award, Check, QrCode, ArrowRight } from "lucide-react";

export default function ArenaModal({ arenaTitle, onClose }) {
  const [confirmed, setConfirmed] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  if (!arenaTitle) return null;

  const handleConfirm = () => {
    // Generate pseudo-random access ticket
    const code = `TF26-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAccessCode(code);
    setConfirmed(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#7EAFD0", "#00F0FF", "#10B981", "#FFFFFF"]
    });
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0E1524] border border-[#7EAFD0]/40 p-8 shadow-[0_0_50px_rgba(126,175,208,0.25)] select-none transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          /* State 1: Arena Dossier */
          <>
            {/* Modal Header */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#7EAFD0] tracking-widest uppercase mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>ARENA DOSSIER // CLASSIFIED</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
              {arenaTitle}
            </h3>

            <div className="mt-6 space-y-4 font-sans text-sm text-gray-300">
              <p>
                You have accessed the operational protocol for <strong className="text-white">{arenaTitle}</strong>. Teams must verify their autonomous safety protocols, payload weight tolerances, and frequency locks prior to entering the arena.
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#7EAFD0]" />
                  <span>DATES: OCT 24-26, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00F0FF]" />
                  <span>LOC: MAIN STADIUM GRID</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>CERTIFICATION: NATIONAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SLOTS: 8 OPEN</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono text-gray-400 hover:text-white"
              >
                DISMISS
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-full bg-[#7EAFD0] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_#7EAFD0] transition-all flex items-center gap-2"
              >
                <span>CONFIRM REGISTRATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* State 2: Professional In-App Success State */
          <div className="py-4 text-center">
            {/* Animated Status Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3">
              <span>PROTOCOL VERIFIED // CONFIRMED</span>
            </div>

            <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight">
              REGISTRATION ACTIVE
            </h3>

            <p className="mt-2 text-sm text-gray-300 font-sans max-w-md mx-auto">
              Your credentials for <strong className="text-white">{arenaTitle}</strong> have been logged into the core festival registry.
            </p>

            {/* Access Pass Card */}
            <div className="mt-6 mx-auto max-w-sm rounded-2xl bg-[#08080C] border border-[#7EAFD0]/30 p-4 text-left font-mono">
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-white/10 pb-2 mb-2">
                <span className="text-[#7EAFD0]">ACCESS TICKET</span>
                <span className="text-emerald-400 font-bold">AUTHORIZED</span>
              </div>
              <div className="text-xl font-bold tracking-widest text-white text-glow-cyan py-1">
                {accessCode}
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-white/5">
                <span>GATEWAY: SECTOR-04</span>
                <span>STATUS: LOCKED</span>
              </div>
            </div>

            {/* Final Action Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleClose}
                className="px-8 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#7EAFD0] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                RETURN TO GRID
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
