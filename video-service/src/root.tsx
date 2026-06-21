import React from "react";
import { Composition } from "remotion";
import { AudiobookVideo } from "./compositions/AudiobookVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AudiobookVideo-16-9"
        component={AudiobookVideo}
        durationInFrames={3000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          audioUrl: "",
          captions: [],
          aspectRatio: "16:9",
          backgroundColor: "#ffffff",
          captionStyle: "tiktok",
          title: "Chapter 1",
          subtitle: "The Beginning",
        }}
      />
      <Composition
        id="AudiobookVideo-9-16"
        component={AudiobookVideo}
        durationInFrames={3000}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          audioUrl: "",
          captions: [],
          aspectRatio: "9:16",
          backgroundColor: "#000000",
          captionStyle: "tiktok",
          title: "Chapter 1",
          subtitle: "The Beginning",
        }}
      />
      <Composition
        id="AudiobookVideo-1-1"
        component={AudiobookVideo}
        durationInFrames={3000}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          audioUrl: "",
          captions: [],
          aspectRatio: "1:1",
          backgroundColor: "#F7F3EC",
          captionStyle: "classic",
          title: "Chapter 1",
          subtitle: "The Beginning",
        }}
      />
    </>
  );
};
