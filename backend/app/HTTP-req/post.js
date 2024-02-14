import express from 'express';
const router = express.Router();

import { configAxios } from '../functions.js';
const axios = configAxios();

import { characters } from '../data.js';

router.post('/add-character', async (req, res) => {
    try {
        const characterName = req.body.name;
        const swapiCharacter = await axios.get(`/people/?search=${characterName}`);
        const swapiName = swapiCharacter.data.results[0].name;

        if (characterName === swapiName) {
            const newCharacter = {
                id: characters.length + 1,
                name: characterName
            };

            characters.push(newCharacter);
            res.send(`${newCharacter.name} has been added to the collection.`);
        }

        //If the provided characterName is incomplete (e.g., 'Obi'), the SWAPI database returns the full name ('Obi-Wan-Kenobi'). To ensure accurate comparison, the code includes an "else" statement suggesting the use of the full name from SWAPI.
        else res.send(`Name input is not valid, maybe you meant ${swapiName}?`);
    }
    catch (error) {
        res.status(400).send('The character does not exist in the Swapi database.');
    }
});

export { router };