import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again in a minute." }
}));

const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  category: z.string().trim().max(100).optional(),
  comment: z.string().trim().max(500).optional(),
  timestamp: z.string().optional()
});

// In-memory feedback store (persists across runtime session)
const feedbackStore = [];

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "techfest-ca-parallax-experience-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get("/api/feedback", (_req, res) => {
  res.json({
    ok: true,
    total: feedbackStore.length,
    feedbacks: feedbackStore.slice(-10) // Return last 10 entries
  });
});

app.post("/api/feedback", (req, res) => {
  const parsed = feedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Validation failed",
      details: parsed.error.flatten()
    });
  }

  const newEntry = {
    id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...parsed.data,
    receivedAt: new Date().toISOString()
  };

  feedbackStore.push(newEntry);
  console.log("[FEEDBACK LOGGED]:", newEntry);

  res.status(201).json({
    ok: true,
    message: "Transmission received. Feedback logged to core registry.",
    entry: newEntry
  });
});

// Fallback for direct local node execution
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[API SERVER]: Running on http://localhost:${PORT}`);
  });
}

export default app;
