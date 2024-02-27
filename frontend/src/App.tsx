import { useEffect, useState } from "react";
import Background from "./components/Background";
import LogoContainer from "./components/LogoContainer";
import Logo from "./components/Logo";
import CollectionButton from "./components/CollectionButton";
import MusicPlayer from "./components/MusicPlayer";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import useCharacters from "./hooks/useCharacters";
import characterService, { Character } from "./services/character-service";

function App() {
  const { characters, setCharacters, error, isLoading } = useCharacters();

  const [isCharactersVisible, setIsCharactersVisibility] = useState(false);

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const [swapTriggered, setSwapTriggered] = useState(false);

  const handleListVisibility = () => {
    setIsCharactersVisibility(!isCharactersVisible);
  };

  const addCharacter = (character: Character) => {
    setCharacters([...characters, character]);
  };

  const deleteCharacter = (character: Character) => {
    setCharacters(characters.filter((c) => c._id !== character._id));
    characterService
      .delete(character._id)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const swapCharacters = (selectedCharacters: Character[]) => {
    characterService
      .swap(selectedCharacters)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSelection = (character: Character) => {
    console.log(`${character.name} was clicked...`);

    setSelectedCharacters((prevCharacter) => {
      const exist = prevCharacter.some((c) => c._id === character._id);
      if (exist) {
        return [character];
      } else {
        return [...prevCharacter, character];
      }
    });
  };

  const handleSwap = () => {
    swapCharacters(selectedCharacters);
    setSelectedCharacters([]);
    setSwapTriggered(true);
  };

  useEffect(() => {
    if (selectedCharacters.length === 2) {
      handleSwap();
    }
  }, [selectedCharacters]);

  useEffect(() => {
    if (swapTriggered) {
      const { request } = characterService.getAll<Character>();

      request
        .then((res) => setCharacters(res.data))
        .catch((error) => console.log(error));
      setSwapTriggered(false);
    }
  }, [handleSwap]);

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
