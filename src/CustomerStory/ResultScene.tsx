import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "./BrowserFrame";
import { COLORS, FONT_FAMILY, RESULT_DURATION, SCENE_FADE_OUT_FRAMES } from "./constants";
import type { CustomerStoryData } from "./schema";

const StatCard: React.FC<{
  value: string;
  label: string;
  accentColor: string;
  delay: number;
}> = ({ value, label, accentColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 70, mass: 0.5 },
  });
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        background: COLORS.surface,
        borderRadius: 16,
        padding: "36px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        transform: `scale(${scale})`,
        opacity,
        border: `1px solid ${accentColor}33`,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: accentColor,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontFamily: FONT_FAMILY,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: COLORS.textSecondary,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const ResultScene: React.FC<{
  result: CustomerStoryData["result"];
  accentColor: string;
}> = ({ result, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [8, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [8, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteScale = spring({
    frame: frame - 55,
    fps,
    config: { damping: 80, mass: 0.7 },
  });
  const quoteOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const screenshotOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const screenshotY = interpolate(frame, [40, 65], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(
    frame,
    [RESULT_DURATION - SCENE_FADE_OUT_FRAMES, RESULT_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        padding: "60px 100px",
        opacity: sceneOpacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 80, marginBottom: 48 }}>
        <div style={{ flex: "0 0 auto" }}>
          {/* Section label */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: accentColor,
              textTransform: "uppercase",
              opacity: labelOpacity,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 32, height: 2, background: accentColor, borderRadius: 1 }} />
            The Result
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: 560,
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
            }}
          >
            {result.headline}
          </h2>
        </div>
      </div>

      {/* Main content: stats + screenshot */}
      <div style={{ display: "flex", gap: 64, flex: 1, alignItems: "flex-start" }}>
        {/* Left: stats + quote */}
        <div style={{ flex: "0 0 600px", display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Stats row */}
          <div style={{ display: "flex", gap: 20 }}>
            {result.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                accentColor={accentColor}
                delay={20 + i * 12}
              />
            ))}
          </div>

          {/* Quote card */}
          <div
            style={{
              background: COLORS.surface,
              borderRadius: 16,
              padding: "32px 36px",
              transform: `scale(${quoteScale})`,
              opacity: quoteOpacity,
              borderLeft: `4px solid ${accentColor}`,
            }}
          >
            <p
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: COLORS.textPrimary,
                lineHeight: 1.6,
                margin: "0 0 20px",
                fontStyle: "italic",
              }}
            >
              "{result.quote}"
            </p>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: COLORS.textSecondary,
              }}
            >
              {result.authorName}
              <span
                style={{
                  fontWeight: 400,
                  color: COLORS.textMuted,
                  marginLeft: 8,
                }}
              >
                · {result.authorTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right: result screenshot */}
        <div
          style={{
            flex: 1,
            opacity: screenshotOpacity,
            transform: `translateY(${screenshotY}px)`,
          }}
        >
          <BrowserFrame src={result.screenshot} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
