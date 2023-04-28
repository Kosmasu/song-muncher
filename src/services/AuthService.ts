import axios, { AxiosResponse } from "axios";

export const fetchToken = async (
  client_id: string,
  client_secret: string,
  redirect_uri: string,
  code: string,
): Promise<AxiosResponse<any, any>> => {
  return axios.post("https://accounts.spotify.com/api/token", {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code',
  }, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export const fetchRefreshToken = async (
  client_id: string,
  client_secret: string,
  token: string,
): Promise<AxiosResponse<any, any>> => {
  return axios.post("https://accounts.spotify.com/api/token", {
    grant_type: 'refresh_token',
    refresh_token: token,
  }, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}