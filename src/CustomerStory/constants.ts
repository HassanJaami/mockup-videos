export const FPS = 30;

// Duration of each scene in frames
export const INTRO_DURATION = 60;      // 2s
export const CHALLENGE_DURATION = 90;  // 3s
export const FEATURE_DURATION = 75;    // 2.5s per feature screenshot
export const RESULT_DURATION = 120;    // 4s
export const OUTRO_DURATION = 60;      // 2s

export const FIXED_DURATION =
  INTRO_DURATION + CHALLENGE_DURATION + RESULT_DURATION + OUTRO_DURATION;
// = 330 frames (11s) — plus features added dynamically

export const computeTotalDuration = (featureCount: number) =>
  FIXED_DURATION + featureCount * FEATURE_DURATION;

// Common fade window at end of each scene
export const SCENE_FADE_OUT_FRAMES = 15;

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
