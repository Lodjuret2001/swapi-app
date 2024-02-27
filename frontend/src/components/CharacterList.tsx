import { Character } from "../services/character-service";
import styled, { css } from "styled-components";

const Card = styled.div`
  border: 2px solid transparent;
  border-radius: 2px;
  box-shadow: 0 0 1px 1px rgba(255, 255, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{ $delete?: boolean }>`
  background: green;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:hover {
    background: transparent;
    transition: background-color 0.3s ease;
  }

  ${(props) =>
    props.$delete &&
    css`
      background: red;
    `}
`;

interface Props {
  characters: Character[];
  deleteCharacter: (character: Character) => void;
  handleSelection: (character: Character) => void;
}

const CharacterList = ({
  characters,
  deleteCharacter,
  handleSelection,
}: Props) => {
  return (
    <div className="flex justify-center mt-6 mb-5">
      <div className="grid grid-cols-3 w-3/5 bg-yellow gap-3 rounded-md">
        {characters.map((character) => (
          <Card key={character._id}>
            <div className=" w-40 h-40 mt-3 overflow-hidden">
              <img
                src={character.imageUrl}
                className="object-cover w-full h-full rounded-full border-2"
              />
            </div>
            <div className="ml-1 flex items-center flex-col">
              <p style={{ color: "white", marginTop: "10px" }}>
                {character.name}
              </p>
              <p style={{ color: "white", fontSize: "10px" }}>
                "{character.subtitle}"
              </p>
            </div>
            <div className="w-full mt-3 mb-3 flex items-center justify-evenly">
              <Button onClick={() => handleSelection(character)}>Swap</Button>
              <Button $delete onClick={() => deleteCharacter(character)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
