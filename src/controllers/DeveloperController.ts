import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import multer from "multer";
import bcrypt, { hashSync } from "bcrypt";
import { Developer, RatingReview, Comment } from "../models/index.js";

export const devLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const { username, password } = req.body;
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
        message: "Developer Account Not Found!",
      });
    }
    if (!bcrypt.compareSync(password, targetDev.password)) {
      return res.status(400).send({
        message: "Password Invalid!",
      });
    }
    const token = jwt.sign(
      {
        username: targetDev.username,
        kuota: targetDev.kuota,
      },
      process.env.JWT_KEY!
    );

    return res.status(200).send({
      message: `Succesful login, Welcome ${targetDev.username}!`,
      username,
      available_quota: targetDev.kuota,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
export const devRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const { username, password, confirmation_password, email } = req.body;
  const image = req.file;
  try {
    await Joi.object({
      username: Joi.string()
        .required()
        .external(usernameExist)
        .label("username"),
      password: Joi.string().required().label("password"),
      confirmation_password: Joi.any()
        .valid(Joi.ref("password"))
        .label("confirmation_password"),
      email: Joi.string().required().external(emailExist).label("email"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }

  const dev = await Developer.create({
    username,
    password: hashSync(password, 10),
    email,
    kuota: 0,
  });
  return res.status(201).send({
    message: `Register success, welcome ${username}!`,
    Developer: dev,
  });
};
export const devForgorPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  try {
    await Joi.object({
      username: Joi.string().required().label("username"),
      email: Joi.string().required().label("email"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  const dev = await Developer.findOne({
    where: {
      username: username,
      email: email,
    },
  });
  if (!dev) {
    return res.status(400).send({ message: "Invalid Credentials!" });
  }
  return res.status(200).send({
    message: `Credentials Match, hello ${dev.username}!`,
    your_password: dev.password,
  });
};
export const devTopUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const { username, amount } = req.body;
  try {
    const token = req.header("x-auth-token");
    if (!token) throw new Error();
    interface JwtPayload {
      username: string;
      kuota: number;
    }
    const userdata = jwt.verify(token!, process.env.JWT_KEY!) as JwtPayload;
    if (userdata.username != username) {
      return res.status(400).send("Please authenticate");
    }
  } catch (err) {
    return res.status(400).send("Unauthorized");
  }
  try {
    await Joi.object({
      username: Joi.string().required().label("username"),
      amount: Joi.number().min(5).required().label("amount"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  const dev = await Developer.findByPk(username);
  if (!dev) {
    return res.status(400).send({ message: "Invalid Credentials!" });
  }
  const old: number = dev.kuota;
  dev.kuota += parseInt(amount);
  await dev.save();

  return res.status(200).send({
    message: `Top Up success`,
    new_value: dev.kuota,
    old_value: old,
  });
};
export const devBuyInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { song_id }: { song_id: string } = req.body;
  let dev;
  try {
    const token = req.header("x-auth-token");
    if (!token) throw new Error();
    interface JwtPayload {
      username: string;
      kuota: number;
    }
    const userdata = jwt.verify(token!, process.env.JWT_KEY!) as JwtPayload;
    dev = await Developer.findByPk(userdata.username);
    if (!dev) {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).send("Unauthorized");
  }
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song_id"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  const old_quota: number = dev.kuota;
  const Comments = await Comment.findAll({
    attributes: ["comment", ["user_id", "commented_by"]],
    where: { song_id: song_id },
  });
  const Reviews = await RatingReview.findAll({
    attributes: ["rating", "review", ["user_id", "reviewed_by"]],
    where: { song_id: song_id },
  });
  if (Comments.length == 0 && Reviews.length == 0) {
    return res.status(404).send({
      message: "Song ID has no related Comments or Review",
      old_quota,
      new_quota: old_quota,
    });
  } else {
    if (dev.kuota < 1) {
      return res.status(400).send({
        message: "Not enough quota, please Top Up first!",
      });
    }
    dev.kuota -= 1;
    await dev.save();
    return res.status(200).send({
      song_id,
      old_quota,
      new_quota: dev.kuota,
      Comments: Comments,
      Reviews: Reviews,
    });
  }
};

export const devBuyCsv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let dev;
  try {
    const token = req.header("x-auth-token");
    if (!token) throw new Error();
    interface JwtPayload {
      username: string;
      kuota: number;
    }
    const userdata = jwt.verify(token!, process.env.JWT_KEY!) as JwtPayload;
    dev = await Developer.findByPk(userdata.username);
    if (!dev) {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).send("Unauthorized");
  }

  if (dev.kuota < 50) {
    return res.status(400).send({
      message: "Not enough quota, please Top Up first!",
    });
  }
  dev.kuota -= 50;
  await dev.save();

  return res.status(200).send({});
};

export const usernameExist = async (username: string) => {
  const dev = await Developer.findOne({
    where: {
      username: username,
    },
  });
  if (dev) throw new Error("Username sudah di gunakan");
  return dev;
};
export const emailExist = async (email: string) => {
  const dev = await Developer.findOne({
    where: {
      email: email,
    },
  });
  if (dev) throw new Error("Email sudah di gunakan");
  return dev;
};
// export const verifyPassword = async (pass: string, hashed: string) => {
//   const result = await bcrypt.compare(pass,hashed);
//   return result;
// }
export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "storage/uploads/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      req.body.username +
        file.originalname.substring(file.originalname.length - 4)
    );
  },
});
