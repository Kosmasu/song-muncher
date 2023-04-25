import { Request, Response } from "express";
import { fetchSong } from "../services/Song.js";

export const getSong = async (req: Request, res: Response) => {
  const { params: { song_id } } = req;
  const response = await fetchSong(song_id, req.header("Authorization") as string);
  return res.status(200).send(response.data);
}