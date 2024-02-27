import mongoose from "mongoose";

const characterSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    subtitle: String,
    imageUrl: String,
  },
  {
    versionKey: false,
  }
);

const Character = mongoose.model("Character", characterSchema);

export default Character;
