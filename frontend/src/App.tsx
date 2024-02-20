import { useState } from "react";
import Background from "./components/Background";
import LogoContainer from "./components/LogoContainer";
import Logo from "./components/Logo";
import CollectionButton from "./components/CollectionButton";
import MusicPlayer from "./components/MusicPlayer";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import useCharacters from "./hooks/useCharacters";
import { Character } from "./services/character-service";

function App() {
  const [isCharactersVisible, setIsCharactersVisibility] = useState(false);

  const handleListVisibility = () => {
    setIsCharactersVisibility(!isCharactersVisible);
  };

  const { characters, setCharacters, error, isLoading } = useCharacters();

  const addCharacter = (character: Character) => {
    setCharacters([...characters, character]);
  };

  return (
    <>
      {isLoading && <div style={{ color: "blue" }}>Page is Loading...</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Background />
      <LogoContainer>
        <Logo />
        <CollectionButton onClick={handleListVisibility}>
          {isCharactersVisible
            ? "Hide Star Wars Collection"
            : "Show Star Wars Collection"}
        </CollectionButton>
        <MusicPlayer />
        <CharacterForm addCharacter={addCharacter} />
      </LogoContainer>
      {isCharactersVisible && <CharacterList characters={characters} />}
    </>
  );
}

export default App;
