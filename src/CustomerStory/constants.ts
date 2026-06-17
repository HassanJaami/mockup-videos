export const FPS = 30;

// Duration of each scene in frames (all ≥ 5s = 150 frames)
export const INTRO_DURATION = 150;     // 5s
export const CHALLENGE_DURATION = 150; // 5s
export const FEATURE_DURATION = 150;   // 5s per feature screenshot
export const RESULT_DURATION = 180;    // 6s  — stats + quote need a beat longer
export const OUTRO_DURATION = 150;     // 5s

export const FIXED_DURATION =
  INTRO_DURATION + CHALLENGE_DURATION + RESULT_DURATION + OUTRO_DURATION;
// = 630 frames (21s) — plus features added dynamically

export const computeTotalDuration = (featureCount: number) =>
  FIXED_DURATION + featureCount * FEATURE_DURATION;

// Fade-out window at the end of each scene (1s)
export const SCENE_FADE_OUT_FRAMES = 30;

export const COLORS = {
  bg: "#0A0F1E",
  surface: "#111827",
  surfaceAlt: "#1F2937",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  browserChrome: "#1E293B",
  browserBar: "#0F172A",
  browserDot1: "#FF5F57",
  browserDot2: "#FEBC2E",
  browserDot3: "#28C840",
};

export const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
