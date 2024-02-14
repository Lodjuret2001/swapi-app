import express from 'express';
const router = express.Router();

import { validateLengthOf } from "../functions.js";
import { characters } from '../data.js';

router.put('/swap-characters', (req, res) => {
    try {

        const reqCharacters = req.body.characters;

        if (!reqCharacters || !Array.isArray(reqCharacters) || reqCharacters.length !== 2) return res.status(400).send('Invalid Request Structure');

        const invalidCharacters = reqCharacters.filter((char) => {
            return !characters.some((c) => c.name === char.name);
        });

        validateLengthOf(invalidCharacters, res);

        const [character1, character2] = reqCharacters

        const index1 = characters.findIndex(c => c.name === character1.name)
        const index2 = characters.findIndex(c => c.name === character2.name);

        characters[index1] = character2;
        characters[index2] = character1;

        res.send(`You have swapped places with ${character1.name} and ${character2.name} succesfully!`);
    }
    catch (error) {
        console.error(error.message);
    }
});

export { router };