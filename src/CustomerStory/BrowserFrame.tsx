import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS } from "./constants";

export const BrowserFrame: React.FC<{
  src: string;
  style?: React.CSSProperties;
}> = ({ src, style }) => {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        ...style,
      }}
    >
      {/* Browser toolbar */}
      <div
        style={{
          height: 44,
          background: COLORS.browserChrome,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: COLORS.browserDot1,
          }}
        />
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: COLORS.browserDot2,
          }}
        />
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: COLORS.browserDot3,
          }}
        />
        <div
          style={{
            flex: 1,
            height: 26,
            background: COLORS.browserBar,
            borderRadius: 6,
            marginLeft: 16,
          }}
        />
      </div>

      {/* Screenshot */}
      <Img
        src={staticFile(src)}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
};
