import React from "react";
import { interpolate } from "remotion";

interface WaveformDecorationProps {
  width: number;
  height: number;
  frame: number;
  fps: number;
}

export const WaveformDecoration: React.FC<WaveformDecorationProps> = ({
  width,
  height,
  frame,
  fps,
}) => {
  const barCount = 40;
  const bars = Array.from({ length: barCount });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Top-left waveform decoration */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
          opacity: 0.1,
        }}
      >
        {bars.slice(0, 15).map((_, i) => {
          const height =
            20 +
            Math.sin((frame / fps) * 2 + i * 0.5) * 15 +
            Math.sin(i * 0.3) * 10;
          return (
            <div
              key={i}
              style={{
                width: 3,
                height: Math.max(4, height),
                backgroundColor: "#C8956C",
                borderRadius: 2,
              }}
            />
          );
        })}
      </div>

      {/* Bottom-right waveform decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 40,
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
          opacity: 0.08,
        }}
      >
        {bars.slice(0, 20).map((_, i) => {
          const height =
            15 +
            Math.sin((frame / fps) * 1.5 + i * 0.4) * 12 +
            Math.cos(i * 0.25) * 8;
          return (
            <div
              key={i}
              style={{
                width: 2,
                height: Math.max(3, height),
                backgroundColor: "#B8924F",
                borderRadius: 1,
              }}
            />
          );
        })}
      </div>

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200, 149, 108, 0.05) 0%, transparent 50%)",
        }}
      />
    </div>
  );
};
