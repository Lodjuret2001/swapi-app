import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import characterService, { Character } from "../services/character-service";
import { isAxiosError } from "axios";

const Input = styled.input`
  border: 2px solid transparent;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.7);
  outline: none;
  color: white;
  padding: 0px 2px;

  &::selection {
    background-color: black;
  }
`;

const Button = styled.button`
  background: lightgrey;
  padding: 0px 10px;
  border-radius: 2px;
  border: 2px solid gray;
`;

interface Form {
  name: string;
}

interface Props {
  addCharacter: (character: Character) => void;
}

const CharacterForm = ({ addCharacter }: Props) => {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage("");
      setMessageColor("blue");
    }, 5000);
    return () => clearInterval(interval);
  }, [message]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderTexts = [
    "Yoda...",
    "Luke Skywalker...",
    "Darth Vader...",
    "Boba Fett...",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) =>
        prevIndex === placeholderTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: Form) => {
    try {
      const response = await characterService.create<Character>(data);
      const character = response.data;
      addCharacter(character);
      setMessageColor("green");
      setMessage(`Added ${character.name} to the collection!`);
    } catch (error) {
      if (isAxiosError(error)) {
        setMessageColor("red");
        setMessage(error.response?.data);
        console.error(error);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <div className="mb-3 mt-2">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {
              required: {
                value: true,
                message: "Need to enter a name...",
              },
              minLength: {
                value: 3,
                message: "Name must be atleast 3 characters...",
              },
            })}
            type="name"
            placeholder={placeholderTexts[placeholderIndex]}
            style={{ background: `${messageColor}` }}
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="mt-3">
          {errors.name && (
            <p style={{ color: "red", fontSize: "11px" }}>
              {errors.name.message}
            </p>
          )}
          {message !== "" && (
            <p style={{ color: `${messageColor}`, fontSize: "11px" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
