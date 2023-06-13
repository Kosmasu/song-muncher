import { getUser } from "../services/UserService.js";
export const getUserID = async (bearer_token) => {
    return (await getUser(bearer_token)).data.id;
};
