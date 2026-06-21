import React from "react";
import { interpolate, spring } from "remotion";

interface Caption {
  text: string;
  startMs: number;
  endMs: number;
}

interface CaptionHighlightProps {
  captions: Caption[];
  currentFrame: number;
  fps: number;
  style: string;
  isVertical: boolean;
  textColor: string;
}

export const CaptionHighlight: React.FC<CaptionHighlightProps> = ({
  captions,
  currentFrame,
  fps,
  style,
  isVertical,
  textColor,
}) => {
  const currentTimeMs = (currentFrame / fps) * 1000;

  const currentCaption = captions.find(
    (cap) => currentTimeMs >= cap.startMs && currentTimeMs < cap.endMs
  );

  if (!currentCaption) {
    return null;
  }

  const words = currentCaption.text.split(" ");
  const captionProgress = interpolate(
    currentTimeMs,
    [currentCaption.startMs, currentCaption.endMs],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const wordsPerSecond = words.length / ((currentCaption.endMs - currentCaption.startMs) / 1000);
  const currentWordIndex = Math.min(
    Math.floor((currentTimeMs - currentCaption.startMs) / 1000 * wordsPerSecond),
    words.length - 1
  );

  if (style === "tiktok") {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          maxWidth: isVertical ? "100%" : "80%",
        }}
      >
        {words.map((word, index) => {
          const isActive = index === currentWordIndex;
          const wordScale = isActive
            ? spring({
                frame: currentFrame,
                fps,
                config: { damping: 200, mass: 0.5 },
              })
            : 1;

          return (
            <span
              key={`${currentCaption.startMs}-${index}`}
              style={{
                fontSize: isVertical ? 48 : 64,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                color: isActive ? "#C8956C" : textColor,
                transform: `scale(${wordScale})`,
                display: "inline-block",
                textShadow: isActive
                  ? "0 0 20px rgba(200, 149, 108, 0.5)"
                  : "none",
                transition: "color 0.1s ease",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (style === "classic") {
    return (
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? 200 : 80,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(26, 20, 16, 0.8)",
            padding: "16px 32px",
            borderRadius: 8,
            maxWidth: "80%",
          }}
        >
          {words.map((word, index) => {
            const isActive = index === currentWordIndex;

            return (
              <span
                key={`${currentCaption.startMs}-${index}`}
                style={{
                  fontSize: isVertical ? 32 : 40,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: isActive ? "#C8956C" : "#ffffff",
                  marginRight: 12,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  // Minimal style
  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: isVertical ? "100%" : "70%",
      }}
    >
      {words.map((word, index) => {
        const isActive = index === currentWordIndex;

        return (
          <span
            key={`${currentCaption.startMs}-${index}`}
            style={{
              fontSize: isVertical ? 40 : 52,
              fontFamily: "'Crimson Text', serif",
              fontWeight: 400,
              color: textColor,
              marginRight: 10,
              borderBottom: isActive ? "3px solid #C8956C" : "3px solid transparent",
              paddingBottom: 4,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
