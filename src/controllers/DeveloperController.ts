import * as dotenv from "dotenv";
import { getUser } from "../services/UserService.js";
import { Request, Response ,NextFunction} from "express";
import Joi from "joi";
import jwt from "jsonwebtoken"
import { Developer } from "../models/index.js";

export const getUserID = async (bearer_token: string): Promise<string> => {
  return (await getUser(bearer_token)).data.id;
}

export const devLogin = async (req: Request, res: Response ,next: NextFunction) => {
  dotenv.config();
  const { username,password } = req.body;
  try {
    await Joi.object({
      username: Joi.string().required().label("username"),
      password: Joi.string().required().label("password"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  try {
    const targetDev = await Developer.findByPk(username);
    if (!targetDev) {
      return res.status(404).send({
        message: "Developer Account Not Found!"
      })
    }
    
    let token = jwt.sign({
      username:targetDev.username,
      kuota:targetDev.kuota
    },process.env.JWT_KEY!)
    
    return res.status(201).send({
      message: `Succesful login, Welcome ${targetDev.username}!`,
      username,
      token:token
    })
  }
  catch (error) {
    next(error);
  }
};
export const devRegister = async (req: Request, res: Response ,next: NextFunction) => {
    
};
export const devForgorPassword = async (req: Request, res: Response ,next: NextFunction) => {
    
};
export const devTopUp = async (req: Request, res: Response ,next: NextFunction) => {
    
};
export const devBuyInfo = async (req: Request, res: Response ,next: NextFunction) => {
    
};
