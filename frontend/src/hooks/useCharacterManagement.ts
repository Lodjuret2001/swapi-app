import { useEffect, useState } from "react";
import characterService, { Character } from "../services/character-service";
import useCharacters from "./useCharacters";

const characterManagement = () => {
  const { characters, setCharacters } = useCharacters();

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const [swapTriggered, setSwapTriggered] = useState(false);

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

  return {
    deleteCharacter,
    addCharacter,
    swapCharacters,
    handleSelection,
    handleSwap,
    characters,
  };
};

export default characterManagement;
