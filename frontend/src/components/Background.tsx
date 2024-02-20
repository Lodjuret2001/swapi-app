import { useRef } from "react";
import styled from "styled-components";
import videoSource from "../assets/videos/galaxy-background.mp4";

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -100;
`;

const Background = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideo = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  };

  return (
    <>
      <Video autoPlay loop muted ref={videoRef} onPlay={handleVideo}>
        <source src={videoSource} type="video/mp4"></source>
      </Video>
    </>
  );
};

export default Background;
