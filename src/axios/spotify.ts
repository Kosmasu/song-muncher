import axios, { AxiosInstance } from "axios";

const axiosSpotify: AxiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
})

export default axiosSpotify;