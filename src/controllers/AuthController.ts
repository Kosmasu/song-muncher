import * as dotenv from "dotenv";
import { generateRandomString } from "../helper/index.js";
import { Request, Response } from "express";
import { fetchToken } from "../services/AuthRoute.js";
import Joi from "joi";

export const login = async (req: Request, res: Response) => {
  const { query: { redirect_uri } } = req;
  try {
    await Joi.object({
      redirect_uri: Joi.string().required().uri(),
    }).validateAsync(req.query);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  dotenv.config();
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  const client_id = process.env.CLIENT_ID!;
  // const redirect_uri = 'http://' + process.env.URL + '/api/auth/callback-login';
  const queries = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri as string,
    state: state
  });

  res.status(200).send({ url: 'https://accounts.spotify.com/authorize?' + queries });
  // res.redirect('https://accounts.spotify.com/authorize?' + queries);
}

export const callbackLogin = async (req: Request, res: Response) => {
  dotenv.config();
  const { query: { code, error, state, redirect_uri } } = req;
  try {
    await Joi.object({
      redirect_uri: Joi.string().required().uri().label("redirect URI"),
      code: Joi.string().optional(),
      error: Joi.string().optional(),
      state: Joi.string().required(),
    }).xor("code", "error").validateAsync(req.query);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  if (error) {
    return res.status(400).send({ message: "Gagal Login!", code, error, state });
  }
  else if (code) {
    const client_id = process.env.CLIENT_ID!;
    const client_secret = process.env.CLIENT_SECRET!;
    // const redirect_uri = 'http://' + process.env.URL + '/api/auth/callback-login';
    const response = await fetchToken(client_id, client_secret, redirect_uri as string, code as string)
    return res.status(200).send(response.data);
  }
}