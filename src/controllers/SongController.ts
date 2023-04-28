import { NextFunction, Request, Response } from "express";
import { fetchSong } from "../services/SongService.js";
import { SpotifyAPIError } from "../exceptions/SpotifyAPIError.js";

export const getSong = async (req: Request, res: Response, next: NextFunction) => {
  const { params: { song_id } } = req;
  try {
    const response = await fetchSong(song_id, req.header("Authorization") as string);
    return res.status(200).send(response.data);
  }
  catch (error) {
    next(error);
  }
}

/**
 * Will return null if the song does not exist, or return the song object if the song does exist.
 * will throw an exception if the status code is not 200
 * @param song_id the id of the song e.g "11dFghVXANMlKmJXsNCbNl"
 * @param authorization the Authorization header e.g "Bearer B11577ygspod234..."
 */
export const isSongExist = async (song_id: string, authorization: string): Promise<boolean> => {
  const response = await fetchSong(song_id, authorization);
  if (response.status != 200) {
    return Promise.reject(response);
  }
  return true;
}