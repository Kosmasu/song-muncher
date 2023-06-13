import axiosSpotify from "../axios/spotify.js";
export const fetchSongs = async (query, type, bearer_token) => {
    return axiosSpotify.get(`/search`, {
        headers: {
            Authorization: bearer_token,
        },
        params: {
            query,
            type,
        }
    });
};
export const fetchSong = async (song_id, bearer_token) => {
    return axiosSpotify.get(`/tracks/${song_id}`, {
        headers: {
            Authorization: bearer_token,
        },
    });
};
