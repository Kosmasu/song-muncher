import axiosSpotify from "../axios/spotify.js";

export const fetchSong = async (song_id: string, Authorization: string) => {
  return await axiosSpotify.get(`/tracks/${song_id}`, {
    headers: {
      Authorization: Authorization,
    },
  });
}