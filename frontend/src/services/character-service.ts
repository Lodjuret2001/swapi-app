import create from "./http-service";

export interface Character {
  _id: number;
  name: string;
  subtitle: string;
  imageUrl: string;
}

export default create("/characters");
