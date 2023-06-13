import axios from "axios";
import { SpotifyAPIError } from "../exceptions/SpotifyAPIError.js";
const axiosSpotify = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});
/**
 */
axiosSpotify.interceptors.response.use(response => {
    return response;
}, (error) => {
    console.error(error);
    if ((error.response?.data).error.status && (error.response?.data).error.message) {
        throw new SpotifyAPIError((error.response?.data).error.status, (error.response?.data).error.message);
    }
    throw error;
    // return Promise.reject(new SpotifyAPIError((error.response?.data as any).error.status, (error.response?.data as any).error.message));
});
export default axiosSpotify;
