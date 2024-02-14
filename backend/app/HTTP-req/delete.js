import express from 'express';
const router = express.Router();

import { findCharacter } from "../functions.js";
import { characters } from '../data.js';

router.delete('/collection/:id', (req, res) => {

    try {

        const character = findCharacter(characters, req, res);

        const index = characters.indexOf(character);

        if (character) characters.splice(index, 1);
        res.send(`The Character ${character.name} was removed.`);

    } catch (error) {
        res.send(error.message);
    }
});

export { router };