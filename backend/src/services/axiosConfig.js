import axios from "axios";

export default axios.create({
  baseURL: "https://api.swu-db.com/cards/",
});
