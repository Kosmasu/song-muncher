import axios from "axios";
export const fetchToken = async (client_id, client_secret, redirect_uri, code) => {
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
};
export const fetchRefreshToken = async (client_id, client_secret, token) => {
    return axios.post("https://accounts.spotify.com/api/token", {
        grant_type: 'refresh_token',
        refresh_token: token,
    }, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};
