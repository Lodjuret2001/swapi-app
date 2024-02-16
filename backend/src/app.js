import express from "express";
const app = express();
app.use(express.json());

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/swapi-app")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Failed to connect to MongoDB"));

import { charactersRoutes } from "./routes/charactersRoutes.js";

app.use(charactersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}...`));
