import * as dotenv from "dotenv";
import { generateRandomString } from "../helper/index.js";
import { NextFunction, Request, Response } from "express";
import { fetchRefreshToken, fetchToken } from "../services/AuthService.js";
import Joi from "joi";

const stateKey = 'spotify_auth_state';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query: { redirect_uri } } = req;
  try {
    await Joi.object({
      redirect_uri: Joi.string().required().uri().label("redirect URI"),
    }).validateAsync(req.query);
    dotenv.config();
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const client_id = process.env.CLIENT_ID!;
    const queries = new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri as string,
      state: state
    });
    res.cookie(stateKey, state);
    res.status(200).send({ url: 'https://accounts.spotify.com/authorize?' + queries });
    // res.redirect(`https://accounts.spotify.com/authorize?${queries}`);
  }
  catch (error) {
    next(error);
  }
}

export const callbackLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query: { code, error, state, redirect_uri } } = req;
    dotenv.config();
    await Joi.object({
      redirect_uri: Joi.string().required().uri().label("redirect URI"),
      code: Joi.string().optional(),
      error: Joi.string().optional(),
      state: Joi.string().required(),
    }).xor("code", "error").validateAsync(req.query);
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log('req.cookies:', req.cookies);
    console.log('storedState:', storedState);
    console.log('state:', state);
    if (state === null || state !== storedState) {
      return res.status(400).send({
        status: 400,
        message: "State is invalid!",
      })
    }
    res.clearCookie(stateKey);
    if (error) {
      return res.status(400).send({
        status: 400,
        message: error,
      });
    }
    else if (code) {
      const client_id = process.env.CLIENT_ID!;
      const client_secret = process.env.CLIENT_SECRET!;
      // const redirect_uri = 'http://' + process.env.URL + '/api/auth/callback-login';
      const response = await fetchToken(client_id, client_secret, redirect_uri as string, code as string)
      return res.status(200).send(response.data);
    }
  }
  catch (error) {
    next(error);
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query: { refresh_token } } = req;
    const client_id = process.env.CLIENT_ID!;
    const client_secret = process.env.CLIENT_SECRET!;
    console.log('refresh_token:', refresh_token);
    const response = await fetchRefreshToken(client_id, client_secret, String(refresh_token));
    return res.status(200).send(response.data);
  }
  catch (error) {
    next(error);
  }
}