import React, { useState } from "react";
import confetti from "canvas-confetti";
import { submitFeedback } from "../lib/api";
import { Star, Send, CheckCircle2, ShieldCheck, Github, ExternalLink } from "lucide-react";
import TechfestLogo from "../components/UI/TechfestLogo";

export default function Scene5Exit() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("Parallax Depth & Visuals");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackError("");

    try {
      await submitFeedback({
        rating,
        category,
        comment: comment.trim() || undefined,
        timestamp: new Date().toISOString()
      });

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#7EAFD0", "#00F0FF", "#FFFFFF", "#9D4EDD"]
      });
    } catch (err) {
      setFeedbackError(err.message || "Failed to log feedback. Is the API server running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="scene-exit"
      className="relative w-full min-h-screen py-24 overflow-hidden bg-gradient-to-t from-[#7EAFD0]/30 via-[#0A121F] to-[#070A10] flex flex-col items-center justify-center text-white"
    >
      {/* Radiant Light Shafts Upward */}
      <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-[#7EAFD0]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-none">
        {/* Terminal Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#7EAFD0] font-mono text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>[ 05 // RE-EMERGENCE PROTOCOL // MISSION ACCOMPLISHED ]</span>
        </div>

        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-white font-display leading-[0.88] drop-shadow-2xl">
          ASCENT COMPLETE
        </h2>

        <p className="mt-6 text-base sm:text-xl text-[#D4E9F7] font-sans max-w-xl mx-auto font-light leading-relaxed">
          You have navigated the five tiers of the machine metropolis. Transmission validated by CA Techfest evaluation protocols.
        </p>

        {/* Interactive Evaluation Terminal Form */}
        <div className="mt-12 w-full max-w-xl mx-auto bg-[#0E1524]/80 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl text-left">
          <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
            <span className="font-mono text-xs text-[#7EAFD0] tracking-widest uppercase">
              EVALUATION CONSOLE // POST /api/feedback
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
              STATUS: LIVE
            </span>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
                TRANSMISSION RECEIVED
              </h3>
              <p className="mt-2 text-sm text-gray-300 font-sans">
                Your evaluation telemetry has been recorded to the core Express backend. Thank you for judging!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-5 py-2 rounded-full border border-white/20 text-xs font-mono text-gray-300 hover:text-white hover:border-[#7EAFD0] transition-colors"
              >
                SUBMIT ANOTHER LOG
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Experience Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? "fill-[#7EAFD0] text-[#7EAFD0] drop-shadow-[0_0_8px_#7EAFD0]"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-sm text-[#7EAFD0] ml-3 font-bold">
                    {rating} / 5 STARS
                  </span>
                </div>
              </div>

              {/* Feedback Category */}
              <div>
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Primary Dimension:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#08080C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-[#7EAFD0] focus:outline-none"
                >
                  <option value="Parallax Depth & Visuals">Parallax Depth & Visuals (150 pts)</option>
                  <option value="Fluid 60 FPS Motion & Lenis">Fluid 60 FPS Motion & Lenis</option>
                  <option value="Responsive Layout & Bento Grid">Responsive Layout & Bento Grid</option>
                  <option value="3D WebGL Canvas & Web Audio">3D WebGL Canvas & Web Audio</option>
                </select>
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Evaluator Feedback / Observations:
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Record your remarks on depth layers, pacing, or performance..."
                  maxLength={500}
                  className="w-full bg-[#08080C] border border-white/10 rounded-xl p-3 text-sm text-white font-sans placeholder-gray-600 focus:border-[#7EAFD0] focus:outline-none resize-none"
                />
              </div>

              {feedbackError && (
                <div className="font-mono text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  {feedbackError}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#7EAFD0] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>TRANSMITTING TELEMETRY...</span>
                ) : (
                  <>
                    <span>SUBMIT EXPERIENCE TELEMETRY</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Credits */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <div className="flex items-center gap-3">
            <TechfestLogo size={28} withGlow={false} />
            <span>TECHFEST CA PROGRAM // TASK 3: PARALLAX EXPERIENCE (150 PTS)</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#7EAFD0]">REACT · GSAP · LENIS · THREE.JS · EXPRESS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
