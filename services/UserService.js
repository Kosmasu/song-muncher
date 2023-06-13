import axiosSpotify from "../axios/spotify.js";
export const getUser = async (bearer_token) => {
    const response = axiosSpotify.get("/me", {
        headers: {
            Authorization: bearer_token,
        }
    });
    return response;
};
