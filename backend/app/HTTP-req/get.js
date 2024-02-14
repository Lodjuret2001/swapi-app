import express from "express";
const router = express.Router();

import { findCharacter } from "../functions.js";
import { characters } from "../data.js";

router.get('/', (req, res) => {
    res.send('In a Galaxy Far, Far Away...');
});

router.get('/collection', (req, res) => {
    res.send(characters);
});

router.get('/collection/:id', (req, res) => {
    const character = findCharacter(characters, req, res);
    res.send(character);
});

export { router };