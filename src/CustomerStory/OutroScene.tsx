import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, OUTRO_DURATION } from "./constants";

export const OutroScene: React.FC<{
  customerName: string;
  accentColor: string;
}> = ({ customerName, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({ frame, fps, config: { damping: 80, mass: 0.5 } });

  const ctaOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(
    frame,
    [OUTRO_DURATION - 15, OUTRO_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${accentColor}33 0%, ${COLORS.bg} 60%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity: sceneOpacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Accent pill */}
      <div
        style={{
          background: `${accentColor}22`,
          border: `1px solid ${accentColor}66`,
          borderRadius: 100,
          padding: "8px 24px",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accentColor,
          opacity: fadeIn,
          marginBottom: 8,
        }}
      >
        Customer Success Story
      </div>

      {/* Customer name */}
      <div
        style={{
          fontSize: 88,
          fontWeight: 800,
          color: COLORS.textPrimary,
          letterSpacing: "-0.03em",
          opacity: fadeIn,
          transform: `scale(${scale})`,
        }}
      >
        {customerName}
      </div>

      {/* CTA */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 400,
          color: COLORS.textSecondary,
          opacity: ctaOpacity,
          marginTop: 8,
        }}
      >
        Read the full story at{" "}
        <span style={{ color: accentColor, fontWeight: 600 }}>yourwebsite.com</span>
      </div>
    </AbsoluteFill>
  );
};
