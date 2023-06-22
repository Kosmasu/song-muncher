import axios, { AxiosError, AxiosInstance } from "axios";
import { SpotifyAPIError } from "../exceptions/SpotifyAPIError.js";

const axiosSpotify: AxiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
})

/**
 */
axiosSpotify.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  console.error(error);
  if ((error.response?.data as any).error.status && (error.response?.data as any).error.message) {
    throw new SpotifyAPIError((error.response?.data as any).error.status, (error.response?.data as any).error.message);
  }
  throw error;
  // return Promise.reject(new SpotifyAPIError((error.response?.data as any).error.status, (error.response?.data as any).error.message));
});

export default axiosSpotify;