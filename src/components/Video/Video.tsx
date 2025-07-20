import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useSelector } from "react-redux";
import myCourseApi from "src/apis/myCourseApi";
import { defaultIMG } from "src/assets";
import { selectAuthorization } from "src/reducers/authSlice";

interface VideoProps {
  currentTime?: number;
  duration?: any;
  courseId?: string;
  lessonId?: string;
  source?: string;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({
  courseId,
  lessonId,
  currentTime,
  source,
  poster,
}) => {
  const TIME = 1000;
  const { isRole } = useSelector(selectAuthorization);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
    }
  }, [source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!lessonId || !courseId || isRole !== "student" || !video) return;

    let timeline = 0;

    const updateHandler = () => {
      timeline = video.currentTime;
    };

    video.addEventListener("timeupdate", updateHandler);

    const interval = setInterval(() => {
      const data = { lessonId, timeline };
      uploadTimeVideo(data);
    }, 5 * TIME);

    return () => {
      video.removeEventListener("timeupdate", updateHandler);
      clearInterval(interval);
    };
  }, [lessonId, courseId, isRole]);

  const uploadTimeVideo = async (data: any) => {
    if (!courseId) return;
    try {
      await myCourseApi.updateTimeLineVideoCourse(courseId, data);
    } catch (error) {
      console.log("lỗi rồi");
    }
  };

  return (
    <video
      ref={videoRef}
      poster={poster || defaultIMG}
      controls
      style={{
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#000",
      }}
    >
      <track
        src="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
        default
      />
      <track
        src="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt"
        kind="subtitles"
        srcLang="fr"
        label="French"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
