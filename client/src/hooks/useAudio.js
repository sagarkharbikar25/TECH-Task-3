import { useState, useRef, useEffect } from "react";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const filterRef = useRef(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Low pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filterRef.current = filter;

      // Sub-bass drone oscillator 1 (55Hz - A1)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Drone oscillator 2 (110Hz - A2 with slow chorus detune)
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110.5, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      filter.connect(masterGain);
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio not permitted or supported:", e);
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
      setIsPlaying(true);
    } else if (audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
      setIsPlaying(false);
    }
  };

  const playClick = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Ignored
    }
  };

  const updateDepthResonance = (progressRatio) => {
    if (!filterRef.current || !audioCtxRef.current) return;
    try {
      // Modulate low-pass cutoff from 140Hz up to 550Hz as user descends into the core
      const targetFreq = 140 + progressRatio * 420;
      filterRef.current.frequency.setTargetAtTime(
        targetFreq,
        audioCtxRef.current.currentTime,
        0.1
      );
    } catch (e) {
      // Ignored
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleSound, playClick, updateDepthResonance };
}
