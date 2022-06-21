import React from "react";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";

interface VideoProps {
  source?: any;
}

const Video: React.FC<VideoProps> = ({ source }) => {
  return (
    <Player
      src={source}
      // dimensions={{ width: "100%", height: "100%" }}
      keyboardShortcut={{
        pause: false,
        forward: true,
        rewind: true,
        fullScreen: true,
        mute: true,
        subtitle: true,
      }}
    />
  );
};

export default Video;
