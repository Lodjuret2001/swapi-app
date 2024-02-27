import { useState } from "react";
import {
  Background,
  LogoContainer,
  Logo,
  CollectionButton,
  MusicPlayer,
  CharacterForm,
  CharacterList,
} from "./components/index";
import useCharacters from "./hooks/useCharacters";
import useCharacterManagement from "./hooks/useCharacterManagement";

function App() {
  const { error, isLoading } = useCharacters();

  const { characters, addCharacter, deleteCharacter, handleSelection } =
    useCharacterManagement();

  const [isCharactersVisible, setIsCharactersVisibility] = useState(false);

  const handleListVisibility = () => {
    setIsCharactersVisibility(!isCharactersVisible);
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
      {isCharactersVisible && (
        <CharacterList
          deleteCharacter={deleteCharacter}
          handleSelection={handleSelection}
          characters={characters}
        />
      )}
    </>
  );
}

export default App;
