import { AxiosResponse } from "axios";
import axiosSpotify from "../axios/spotify"

export const getUser = async (bearer_token: string): Promise<AxiosResponse<any, any>> => {
  const response = axiosSpotify.get("/me", {
    headers: {
      Authorization: bearer_token,
    }
  });
  return response;
}