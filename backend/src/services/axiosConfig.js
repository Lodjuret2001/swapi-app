import axios from "axios";

const configAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://swapi.dev/api",
  });
  return axiosInstance;
};

export default configAxios;
