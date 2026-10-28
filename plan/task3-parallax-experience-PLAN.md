# Task 3: Interactive Parallax Scrolling Page (150 pts)

**Repo name:** `techfest-ca-parallax-experience`
**Live URL (target):** `techfest-ca-parallax-experience.vercel.app`
**Stack:** React (Vite) · GSAP + ScrollTrigger · Lenis · Node.js · Express · Vercel
**Estimated time:** ~2 days

> This is your highest-value task. Confirm in the official brief: deliverable format, judging criteria, deadline, and any asset rules. Give this task the most polish.

---

## 1. Concept

A **scroll-driven story**: **"Descent into the city of machines."**
The user scrolls and descends through 5 scenes. Depth, text, and elements move at different speeds. Story first, effects second: judges remember a coherent experience, not just layers moving.

---

## 2. Storyboard (fill this in BEFORE coding)

| Scene | Scroll range | Layers (back → front) | Text | Effect |
|---|---|---|---|---|
| 1. Surface | 0–20% | sky, far skyline, near skyline, foreground | Title + "Scroll to descend" | Hero depth, mouse-move parallax |
| 2. Descent | 20–45% | clouds, towers, cables | Short line of copy | Pinned section, layers drift at different speeds |
| 3. The Core | 45–70% | tunnel rings, machinery, glow | Key line | Zoom/scale reveal |
| 4. Machines | 70–90% | gears, panels, cards | 3 feature cards | Horizontal scroll panel |
| 5. Exit | 90–100% | light, silhouette | CTA | Fade to credits |

Write the actual copy for each scene before building.

---

## 3. Architecture

Backend is optional and thin; this task is frontend-judged.

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Health check |
| `POST /api/feedback` | Optional: a small "rate this experience" form at the end (validated, rate limited) |

### Folder structure
```
techfest-ca-parallax-experience/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/        layered SVG / WebP files per scene
│   │   ├── components/    ParallaxLayer, ScrollProgress, SceneNav, TextReveal
│   │   ├── scenes/        Surface, Descent, Core, Machines, Exit
│   │   ├── hooks/         useLenis, useReducedMotion
│   │   ├── lib/           gsap.js, api.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── api/
│   └── index.js
├── vercel.json
├── package.json
├── .env.example
└── README.md
```

### `api/index.js`
```js
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", rateLimit({ windowMs: 60_000, max: 20 }));

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(300).optional(),
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/feedback", (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false });
  console.log("feedback", parsed.data);
  res.status(201).json({ ok: true });
});

export default app;
```

### `vercel.json`
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Root `package.json`: `"type": "module"`, deps `express`, `cors`, `express-rate-limit`, `zod`.

---

## 4. Core Implementation Notes

### Lenis + ScrollTrigger sync
```js
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {
  const lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

### ParallaxLayer pattern
```jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function ParallaxLayer({ src, speed = 0.3, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);

  return <img ref={ref} src={src} alt="" className={className} />;
}
```

Depth rule: farther layers use a smaller `speed`, nearer layers a larger one.

### Other techniques
- **Pinned scenes:** `ScrollTrigger` with `pin: true` and a scrubbed timeline
- **Horizontal scroll (Scene 4):** pin the container and animate `x` to `-(scrollWidth - innerWidth)`
- **Text reveals:** split lines, animate `y` + `opacity` with `scrub` or `toggleActions`
- **Mouse parallax (Scene 1):** `gsap.quickTo` on `x`/`y` per layer using a depth multiplier
- **Progress indicator:** a fixed bar driven by total scroll progress
- **Scene navigation dots:** `lenis.scrollTo` on click
- **Reduced motion:** if `prefers-reduced-motion` is set, skip parallax and pinning and use simple fade-ins

---

## 5. Assets

- Prefer **SVG** (crisp, tiny). Run through SVGO.
- If using raster layers, export **WebP**, no larger than the display size, and lazy-load below-the-fold scenes.
- Sources: create your own in Figma/Illustrator, use CC0 packs (e.g. OpenGameArt, Kenney), or AI-generated layers if the brief allows. Credit anything third-party.
- Keep total page weight reasonable (aim under ~8 MB).

---

## 6. Build Checklist

- [ ] Create repo, scaffold Vite + GSAP + Lenis, commit `chore: scaffold`
- [ ] Storyboard and copy written (table above)
- [ ] Assets collected and optimized
- [ ] `initScroll` with Lenis + ScrollTrigger sync
- [ ] `ParallaxLayer`, `TextReveal`, `ScrollProgress` components
- [ ] Scene 1 (hero) with mouse-move depth
- [ ] Scene 2 (descent) pinned, layers at different speeds
- [ ] Scene 3 (core) zoom reveal
- [ ] Scene 4 (machines) horizontal scroll
- [ ] Scene 5 (exit) CTA + optional feedback form wired to Express
- [ ] Scene navigation dots
- [ ] `gsap.context()` cleanup in every effect
- [ ] `prefers-reduced-motion` fallback
- [ ] Performance pass: asset sizes, `will-change` only on animating layers
- [ ] Mobile test: iOS Safari and Chrome Android, use `svh`/`dvh`
- [ ] Deploy and test live
- [ ] README with a short screen recording
- [ ] Submit on ca.techfest.org

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Scroll jank | Transform-only animation, optimized assets, no giant PNGs |
| Mobile address-bar viewport jumps | `svh`/`dvh` units, test on real devices |
| ScrollTrigger + React lifecycle bugs | `gsap.context()` and `ctx.revert()` on unmount, call `ScrollTrigger.refresh()` after assets load |
| Pinning + horizontal scroll conflicts | Build and test each scene in isolation first |
| Over-scoping | Cap at 5 scenes; polish beats quantity |
| Slow first load | Lazy-load later scenes, compress assets |

---

## 8. Definition of Done

- Smooth (near 60fps) on a mid-range phone
- Coherent story from first scroll to last
- Reduced-motion handled
- README with a screen recording

---

## 9. README Skeleton

```md
# Descent: Parallax Experience

Techfest CA Program, Web Development, Task 3.

**Live:** https://techfest-ca-parallax-experience.vercel.app

## Preview
<GIF / screen recording>

## Features
- 5-scene scroll-driven story
- Multi-layer parallax with depth-based speeds
- Pinned scenes and horizontal scroll
- Mouse-move depth effect, reduced-motion fallback

## Stack
React (Vite) · GSAP ScrollTrigger · Lenis · Express · Vercel

## Run locally
npm install && cd client && npm install
npm run dev

## Decisions
- SVG layers for sharpness and small size
- Transform-only animation for smooth scroll
- Lenis synced to ScrollTrigger via the GSAP ticker
```
