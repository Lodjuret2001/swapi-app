import mongoose from "mongoose";
import axios from "../services/axiosConfig.js";
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

      const swuCharacter = await axios.get(`search?q=name:${character.name}`);

      const { Name, Subtitle, BackArt, FrontArt } = swuCharacter.data.data[0];

      if (character.name === Name) {
        const existingCharacter = await Character.findOne({ name: Name });

        if (!existingCharacter) {
          let characterWithHigestId = await Character.findOne()
            .sort({ _id: -1 })
            .limit(1);
          if (!characterWithHigestId) {
            characterWithHigestId = { _id: 0 };
          }

          const newCharacter = new Character({
            _id: characterWithHigestId._id + 1,
            name: Name,
            subtitle: Subtitle,
            imageUrl: BackArt !== undefined ? BackArt : FrontArt,
          });
          const savedCharacter = await newCharacter.save();
          res.send(savedCharacter);
        } else {
          return res
            .status(400)
            .send(`${Name} already exists in the collection`);
        }
      }

      //If the provided req.body.name is incomplete (e.g., 'Obi'), the SWU database returns the full name ('Obi-Wan-Kenobi'). To ensure accurate comparison, the code includes an "else" statement suggesting the use of the full name from SWU.
      else
        res
          .status(400)
          .send(`Name input is not valid, maybe you meant ${Name}?`);
    } catch (error) {
      console.error("Error creating character:", error);
      res.status(400).send("The character does not exist in the SWU database.");
    }
  },

  swapCharacters: async (req, res) => {
    try {
      const [character1, character2] = req.body;

      if (!Array.isArray(req.body) || req.body.length !== 2) {
        return res
          .status(400)
          .send("Two characters are required for swapping...");
      }

      if (character1._id === character2._id) {
        return res.send("Cannot swap places with the same character...");
      }

      await Character.findByIdAndUpdate(character1._id, {
        name: character2.name,
        subtitle: character2.subtitle,
        imageUrl: character2.imageUrl,
      });
      await Character.findByIdAndUpdate(character2._id, {
        name: character1.name,
        subtitle: character1.subtitle,
        imageUrl: character1.imageUrl,
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
