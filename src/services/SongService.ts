import { AxiosResponse } from "axios";
import axiosSpotify from "../axios/spotify.js";

export const fetchSongs = async (query: string, type: string, bearer_token:string): Promise<AxiosResponse<any, any>> => {
  return axiosSpotify.get(`/search`, {
    headers: {
      Authorization: bearer_token,
    },
    params: {
      query,
      type,
    }
  });
}

export const fetchSong = async (song_id: string, bearer_token: string): Promise<AxiosResponse<any, any>> => {
  return axiosSpotify.get(`/tracks/${song_id}`, {
    headers: {
      Authorization: bearer_token,
    },
  });
}