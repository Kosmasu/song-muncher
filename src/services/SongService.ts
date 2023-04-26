import { AxiosResponse } from "axios";
import axiosSpotify from "../axios/spotify.js";

export const fetchSong = (song_id: string, Authorization: string): Promise<AxiosResponse<any, any>> => {
  return axiosSpotify.get(`/tracks/${song_id}`, {
    headers: {
      Authorization: Authorization,
    },
  });
}