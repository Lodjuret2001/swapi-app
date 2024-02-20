import { useEffect, useState } from "react";
import characterService, { Character } from "../services/character-service";
import { CanceledError } from "../services/api-client";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = characterService.getAll<Character>();
    request
      .then((res) => {
        setCharacters(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { characters, setCharacters, error, setError, isLoading };
};

export default useCharacters;
