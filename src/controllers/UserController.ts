import axiosSpotify from "../axios/spotify"

export const getUserID = async (bearer_token: string): Promise<string> => {
  const response = await axiosSpotify.get("/me", {
    headers: {
      Authorization: bearer_token,
    }
  });
  return response.data.id;
}