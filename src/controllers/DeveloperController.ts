import * as dotenv from "dotenv";
import { Request, Response ,NextFunction} from "express";
import Joi, { ref } from "joi";
import jwt from "jsonwebtoken"
import multer from "multer";
import { Developer,RatingReview,Comment } from "../models/index.js";



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
  dotenv.config();
  const {username,password,confirmation_password,email} = req.body;
  const image = req.file;
  try {
    await Joi.object({
      username: Joi.string().required().external(usernameExist).label("username"),
      password: Joi.string().required().label("password"),
      confirmation_password: Joi.any().valid(Joi.ref("password")).label("confirmation_password"),
      email: Joi.string().required().external(emailExist).label("email")
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  
  const dev = await Developer.create({
    username,password,ktp:image?.path,email,kuota:0
  });
  return res.status(201).send({
    message:`Register success, welcome ${username}!`,
    Developer:dev,
  })
};
export const devForgorPassword = async (req: Request, res: Response ,next: NextFunction) => {
    
};
export const devTopUp = async (req: Request, res: Response ,next: NextFunction) => {
    
};
export const devBuyInfo = async (req: Request, res: Response ,next: NextFunction) => {
    
};


export const usernameExist = async (username: string) => {
  const dev = await Developer.findOne({
    where: {
      username:username
    }
  });
  if(dev) throw new Error("Username sudah di gunakan")
  return dev;
}
export const emailExist = async (email: string) => {
  const dev = await Developer.findOne({
    where: {
      email:email
    }
  });
  if(dev) throw new Error("Email sudah di gunakan")
  return dev;
}

export const storage = multer.diskStorage({
  destination (req, file, cb) {
      cb(null, 'storage/uploads/images');
  },
  filename (req, file, cb) {
      cb(null, req.body.username + file.originalname.substring(file.originalname.length-4));
  }
})
