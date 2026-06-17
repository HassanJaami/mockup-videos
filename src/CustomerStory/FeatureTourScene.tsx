import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FEATURE_DURATION, FONT_FAMILY } from "./constants";

export const FeatureTourScene: React.FC<{
  screenshot: string;
  label: string;
  index: number;
  total: number;
  accentColor: string;
}> = ({ screenshot, label, index, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // Left panel entrance
  const leftProgress = spring({ frame: frame - 0, fps, config: { damping: 80, mass: 0.5 } });
  const leftOpacity = interpolate(frame, [0, 18], [0, 1], clamp);
  const leftY = interpolate(leftProgress, [0, 1], [28, 0]);

  // Screenshot entrance
  const rightProgress = spring({ frame: frame - 10, fps, config: { damping: 75, mass: 0.8 } });
  const rightX = interpolate(rightProgress, [0, 1], [90, 0]);
  const rightOpacity = interpolate(frame, [10, 32], [0, 1], clamp);

  // Subtle Ken Burns zoom on screenshot
  const zoom = interpolate(frame, [0, FEATURE_DURATION], [1.0, 1.05], clamp);

  // Scene fade-out
  const sceneOpacity = interpolate(
    frame,
    [FEATURE_DURATION - 12, FEATURE_DURATION],
    [1, 0],
    clamp
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: sceneOpacity,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Large faded index watermark */}
      <div
        style={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 420,
          fontWeight: 900,
          color: "#ffffff",
          opacity: 0.025,
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Left panel: counter + label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 580,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          opacity: leftOpacity,
          transform: `translateY(${leftY}px)`,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 36,
            height: 3,
            background: accentColor,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        {/* Feature label */}
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: COLORS.textPrimary,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          {label}
        </div>
      </div>

      {/* Right panel: vertically centered so images of any aspect ratio have no gap */}
      <div
        style={{
          position: "absolute",
          left: 620,
          right: 60,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          padding: "56px 0",
          opacity: rightOpacity,
          transform: `translateX(${rightX}px)`,
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              height: 42,
              background: COLORS.browserChrome,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.browserDot1 }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.browserDot2 }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.browserDot3 }} />
            <div style={{ flex: 1, height: 26, background: COLORS.browserBar, borderRadius: 6, marginLeft: 16 }} />
          </div>

          {/* Screenshot with Ken Burns */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center top",
              lineHeight: 0,
            }}
          >
            <Img
              src={staticFile(screenshot)}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
