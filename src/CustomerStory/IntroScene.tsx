import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, INTRO_DURATION, SCENE_FADE_OUT_FRAMES } from "./constants";

export const IntroScene: React.FC<{
  customerName: string;
  tagline: string;
  accentColor: string;
}> = ({ customerName, tagline, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({ frame, fps, config: { damping: 80, mass: 0.6 } });
  const nameOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const taglineOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [20, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [5, 35], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(
    frame,
    [INTRO_DURATION - SCENE_FADE_OUT_FRAMES, INTRO_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 60%, ${accentColor}22 0%, ${COLORS.bg} 65%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneOpacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Accent line top */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: accentColor,
          borderRadius: 2,
          marginBottom: 48,
        }}
      />

      {/* Customer name */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          color: COLORS.textPrimary,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          opacity: nameOpacity,
          transform: `scale(${nameScale})`,
          textAlign: "center",
        }}
      >
        {customerName}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 400,
          color: COLORS.textSecondary,
          marginTop: 28,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        {tagline}
      </div>

      {/* Accent line bottom */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: accentColor,
          borderRadius: 2,
          marginTop: 48,
        }}
      />
    </AbsoluteFill>
  );
};
