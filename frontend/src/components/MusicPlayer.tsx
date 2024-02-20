import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import intro from "../assets/audio/star-wars-intro.mp3";
import duelOfFates from "../assets/audio/duel-of-fates.mp3";
import cantinaBand from "../assets/audio/cantina-band.mp3";
import imperialMarch from "../assets/audio/imperial-march.mp3";
import acrossTheStars from "../assets/audio/across-the-stars.mp3";
import leiasTheme from "../assets/audio/princess-leias-theme.mp3";

const Select = styled.select`
  background: transparent;
  color: yellow;
  padding: 6px 10px;
  border: solid 2px yellow;
  border-radius: 2px;
  outline: none;
`;

const Option = styled.option`
  background-color: black;
`;

const Button = styled.button`
  background: transparent;
  color: yellow;
  padding: 5px 10px;
  border: solid 2px yellow;
  border-radius: 2px;
`;

const MusicPlayer = () => {
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isPlaying, setIsplaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState(0);

  interface Sound {
    src: string;
    label: string;
  }

  const sounds: Sound[] = [
    { src: intro, label: "Star Wars Intro" },
    { src: duelOfFates, label: "Duel of the Fates" },
    { src: cantinaBand, label: "Cantina Band" },
    { src: imperialMarch, label: "Imperial March" },
    { src: acrossTheStars, label: "Across the Stars" },
    { src: leiasTheme, label: "Princess Leia's Theme" },
  ];

  const handleSoundChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSound(parseInt(event.target.value));
    if (isPlaying) setIsplaying(!isPlaying);
    audioRef.current?.load();
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
      <div className="flex justify-between items-center w-4/5 mt-3 mb-3">
        <Select value={selectedSound} onChange={handleSoundChange}>
          {sounds.map((sound, index) => (
            <Option value={index} key={index}>
              {sound.label}
            </Option>
          ))}
        </Select>
        <Button onClick={play}>
          {isPlaying ? "Pause Music" : "Play Music"}
        </Button>
        <audio ref={audioRef} src={sounds[selectedSound].src}></audio>
      </div>
    </>
  );
};

export default MusicPlayer;
