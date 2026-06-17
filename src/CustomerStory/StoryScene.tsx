import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "./BrowserFrame";
import {
  CHALLENGE_DURATION,
  COLORS,
  FONT_FAMILY,
  SCENE_FADE_OUT_FRAMES,
} from "./constants";

export const StoryScene: React.FC<{
  sectionLabel: string;
  headline: string;
  description: string;
  screenshot: string;
  accentColor: string;
  sceneDuration?: number;
}> = ({
  sectionLabel,
  headline,
  description,
  screenshot,
  accentColor,
  sceneDuration = CHALLENGE_DURATION,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelX = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [10, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [25, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const screenshotX = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 80, mass: 0.8 } }),
    [0, 1],
    [120, 0]
  );
  const screenshotOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(
    frame,
    [sceneDuration - SCENE_FADE_OUT_FRAMES, sceneDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 100px",
        gap: 80,
        opacity: sceneOpacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Left: text content */}
      <div style={{ flex: "0 0 520px", display: "flex", flexDirection: "column" }}>
        {/* Section label */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: accentColor,
            textTransform: "uppercase",
            opacity: labelOpacity,
            transform: `translateX(${labelX}px)`,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: accentColor,
              borderRadius: 1,
            }}
          />
          {sectionLabel}
        </div>

        {/* Headline */}
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.textPrimary,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: 0,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            marginBottom: 28,
          }}
        >
          {headline}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            margin: 0,
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
          }}
        >
          {description}
        </p>
      </div>

      {/* Right: screenshot */}
      <div
        style={{
          flex: 1,
          opacity: screenshotOpacity,
          transform: `translateX(${screenshotX}px)`,
        }}
      >
        <BrowserFrame src={screenshot} />
      </div>
    </AbsoluteFill>
  );
};
