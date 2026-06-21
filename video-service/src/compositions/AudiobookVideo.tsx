import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
} from "remotion";
import { CaptionHighlight } from "../components/CaptionHighlight";
import { WaveformDecoration } from "../components/WaveformDecoration";

interface Caption {
  text: string;
  startMs: number;
  endMs: number;
}

interface AudiobookVideoProps {
  audioUrl: string;
  captions: Caption[];
  aspectRatio: string;
  backgroundColor: string;
  captionStyle: string;
  title: string;
  subtitle: string;
}

export const AudiobookVideo: React.FC<AudiobookVideoProps> = ({
  audioUrl,
  captions,
  aspectRatio,
  backgroundColor,
  captionStyle,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const isVertical = aspectRatio === "9:16";
  const isSquare = aspectRatio === "1:1";

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const captionStartFrame = 90;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'Crimson Text', serif",
      }}
    >
      {/* Background decoration */}
      <WaveformDecoration
        width={width}
        height={height}
        frame={frame}
        fps={fps}
      />

      {/* Title card - first 3 seconds */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
              fontSize: isVertical ? 64 : 80,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: backgroundColor === "#000000" ? "#ffffff" : "#1A1410",
              textAlign: "center",
              padding: "0 40px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              opacity: subtitleOpacity,
              fontSize: isVertical ? 28 : 36,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              color: backgroundColor === "#000000" ? "#C8956C" : "#A67C52",
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Caption area - after title */}
      <Sequence from={captionStartFrame}>
        <AbsoluteFill
          style={{
            justifyContent: isVertical ? "flex-end" : "center",
            alignItems: "center",
            padding: isVertical ? "0 24px 200px" : "0 120px",
          }}
        >
          <CaptionHighlight
            captions={captions}
            currentFrame={frame - captionStartFrame}
            fps={fps}
            style={captionStyle}
            isVertical={isVertical}
            textColor={backgroundColor === "#000000" ? "#ffffff" : "#1A1410"}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Audio track */}
      {audioUrl && <Audio src={audioUrl} />}

      {/* Progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? 120 : 40,
          left: isVertical ? 24 : 80,
          right: isVertical ? 24 : 80,
          height: 4,
          backgroundColor:
            backgroundColor === "#000000"
              ? "rgba(255,255,255,0.2)"
              : "rgba(26,20,16,0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / durationInFrames) * 100}%`,
            backgroundColor: "#C8956C",
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
