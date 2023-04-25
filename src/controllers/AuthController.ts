import * as dotenv from "dotenv";
import { generateRandomString } from "../helper/index.js";
import { Request, Response } from "express";
import axios from "axios";

export const login = async (req: Request, res: Response) => {
  dotenv.config();
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  const client_id = process.env.CLIENT_ID!;
  const redirect_uri = 'http://' + process.env.URL + '/api/auth/callback-login';
  const queries = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });

  res.redirect('https://accounts.spotify.com/authorize?' + queries);
}

export const callbackLogin = async (req: Request, res: Response) => {
  dotenv.config();
  const { query: { code, error, state } } = req;
  if (error) {
    return res.status(400).send({ message: "gagal login!", code, error, state });
  }
  else if (code) {
    const client_id = process.env.CLIENT_ID!;
    const client_secret = process.env.CLIENT_SECRET!;
    const redirect_uri = 'http://' + process.env.URL + '/api/auth/callback-login';
    const response = await axios.post("https://accounts.spotify.com/api/token", {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    }, {
      headers: {
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return res.status(200).send(response.data);
  }
}