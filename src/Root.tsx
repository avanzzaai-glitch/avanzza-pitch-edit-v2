import React from "react";
import { Composition } from "remotion";
import { PitchVideo } from "./PitchVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PitchVideo"
      component={PitchVideo}
      durationInFrames={3132}
      fps={50}
      width={464}
      height={832}
    />
  );
};
