import mongoose from "mongoose";
import configAxios from "../services/axiosConfig.js";
const axios = configAxios();
import Character from "../models/CharacterModel.js";

const CharactersController = {
  getCharacters: async (req, res) => {
    try {
      const characters = await Character.find();
      if (!characters)
        return res.send("Could not find any characters in the database...");
      res.send(characters);
    } catch (error) {
      console.error("Error retrivning characters:", error);
      res.status(500).send("Error retrivning characters:");
    }
  },

  getCharacter: async (req, res) => {
    try {
      const character = await Character.findById(req.params.id);
      if (!character)
        return res.send("Could not find the character with the given id...");
      res.send(character);
    } catch (error) {
      console.error("Error retrivning character:", error);
      res.status(500).send("Error retrivning character:");
    }
  },

  createCharacter: async (req, res) => {
    try {
      const character = req.body;

      const swapiCharacter = await axios.get(
        `/people/?search=${character.name}`
      );
      const swapiName = swapiCharacter.data.results[0].name;

      if (character.name === swapiName) {
        const existingCharacter = await Character.findOne({ name: swapiName });

        if (!existingCharacter) {
          const characters = await Character.find();

          const newCharacter = new Character({
            _id: characters.length + 1,
            name: swapiName,
          });
          const savedCharacter = await newCharacter.save();
          res.send(`${savedCharacter.name} has been added to the collection`);
        } else {
          return res.send(`${swapiName} already exists in the collection`);
        }
      }

      //If the provided req.body.name is incomplete (e.g., 'Obi'), the SWAPI database returns the full name ('Obi-Wan-Kenobi'). To ensure accurate comparison, the code includes an "else" statement suggesting the use of the full name from SWAPI.
      else res.send(`Name input is not valid, maybe you meant ${swapiName}?`);
    } catch (error) {
      console.error("Error creating character:", error);
      res
        .status(400)
        .send("The character does not exist in the Swapi database.");
    }
  },

  swapCharacters: async (req, res) => {
    try {
      const [character1, character2] = req.body;

      if (character1._id === character2._id) {
        return res.send("Cannot swap places with the same character...");
      }

      await Character.findByIdAndUpdate(character1._id, {
        name: character2.name,
      });
      await Character.findByIdAndUpdate(character2._id, {
        name: character1.name,
      });

      res.send(
        `You have swapped places with ${character1.name} and ${character2.name} succesfully!`
      );
    } catch (error) {
      console.error("Error swapping characters:", error);
      res.status(400).send("Error swapping characters...");
    }
  },

  deleteCharacter: async (req, res) => {
    try {
      const deletedCharacter = await Character.findByIdAndDelete(req.params.id);

      if (!deletedCharacter) {
        return res.status(404).send("Character not found in the collection...");
      }
      res.send(`${deletedCharacter.name} was removed from the collection...`);
    } catch (error) {
      console.error("Error deleting character:", error);
      res.status(400).send("Error deleting character...");
    }
  },
};

export default CharactersController;
