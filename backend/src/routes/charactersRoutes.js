import express from "express";
const router = express.Router();

import CharactersController from "../controllers/CharactersController.js";

router.get("/characters", CharactersController.getCharacters);
router.get("/characters/:id", CharactersController.getCharacter);
router.post("/characters", CharactersController.createCharacter);
router.put("/characters", CharactersController.swapCharacters);
router.delete("/characters/:id", CharactersController.deleteCharacter);

export { router as charactersRoutes };
