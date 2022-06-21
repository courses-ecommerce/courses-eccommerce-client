import React, { useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { defaultIMG } from "src/assets";

interface VideoProps {
  source?: any;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({ source, poster }) => {
  const TIME = 1000;
  const ref = useRef<any>(null);
  // const [timeline, setTimeline] = useState(0);

  useEffect(() => {
    let timeline = 0;
    ref.current?.addEventListener("timeupdate", () => {
      timeline = ref.current?.currentTime;
    });
    setInterval(() => {
      // console.log("đã lấy được time là", { timeline });
    }, 5 * TIME);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <Player
      src={source}
      // dimensions={{ width: "100%", height: "100%" }}
      subtitles={[
        {
          lang: "en",
          language: "English",
          url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
        },
        {
          lang: "fr",
          language: "French",
          url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
        },
      ]}
      poster={poster || defaultIMG}
      playerRef={ref}
    >
      {(ref, props) => (
        <ReactHlsPlayer autoPlay loop playerRef={ref} {...props} />
      )}
    </Player>
  );
};

export default Video;
