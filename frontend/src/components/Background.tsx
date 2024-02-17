import { useState, useRef } from "react";
import styled from "styled-components";
import sound from "../assets/audio/star-wars-intro.mp3";
import videoSource from "../assets/videos/galaxy-background.mp4";
import logo from "../assets/images/star-wars-logo.png";

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -100;
`;

const Button = styled.button`
  background: transparent;
  color: yellow;
  padding: 5px 10px;
  border: solid 2px yellow;
  border-radius: 2px;
`;

const Logo = styled.img`
  height: 200px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: 2px solid yellow;
  border-radius: 2px;
  margin-top: 50px;
`;

const Background = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isPlaying, setIsplaying] = useState(false);

  const handleVideo = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  };

  const play = () => {
    setIsplaying(!isPlaying);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <>
      <Video autoPlay loop muted ref={videoRef} onPlay={handleVideo}>
        <source src={videoSource} type="video/mp4"></source>
      </Video>
      <div className="flex justify-center w-1/1">
        <Div>
          <Logo src={logo}></Logo>
          <Button>See the collection of Star wars characters</Button>
          <Button onClick={play} className="mt-3 mb-5">
            {isPlaying ? "Pause Music" : "Play Music"}
          </Button>
        </Div>
      </div>
      <audio ref={audioRef} src={sound}></audio>
    </>
  );
};

export default Background;
