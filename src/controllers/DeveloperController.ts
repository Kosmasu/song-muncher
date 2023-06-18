import fs from "fs";
import Joi from "joi";
import multer from "multer";
import AdmZip from "adm-zip";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bcrypt, { hashSync } from "bcrypt";
import { Parser } from "@json2csv/plainjs";
import { Request, Response, NextFunction } from "express";
import { generateRandomString } from "../helper/index.js";
import { Developer, RatingReview, Comment } from "../models/index.js";
import { error } from "console";
import { send } from "process";

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

export const devResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
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
    return res.status(404).send({ message: "Invalid Credentials!" });
  }
  let newRandPassword = generateRandomString(8);
  dev.password = hashSync(newRandPassword, 10);
  try {
    let tunggu = await dev.save();
    if (!tunggu) {
      throw new Error();
    }
  } catch (error) {
    return res.status(404).send({ message: "Failed to change Password" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"],
    port: 2525,
    auth: {
      user: process.env["SMTP_USERNAME"],
      pass: process.env["SMTP_PASSWORD"],
    },
  });

  const mailOptions = {
    from: process.env["SMTP_SENDER"],
    to: process.env["SMTP_RECEIVER"],
    subject: "Password Reset Request",
    text: "Hey it looks like you requested a password reset! ",
    html: `<b>Hey there, below you will find your new password! </b><br><br> Your new password : ${newRandPassword}<br><br> <img src="https://cdn.discordapp.com/attachments/757512219855683645/1118482866528059532/noted.jpg" alt="" style="height: 200px; width: 400px;">`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(400).send({ message: "Mailer Failure" });
    }
    console.log("Email sent: " + info.response);
  });

  return res.status(200).send({
    status: `Password Reset Success`,
    message: "Please check your email for your new password!",
  });
};

export const devTopUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const { amount } = req.body;
  let userdata;
  try {
    const token = req.header("x-auth-token");
    if (!token) throw new Error();
    interface JwtPayload {
      username: string;
      kuota: number;
    }
    userdata = jwt.verify(token!, process.env.JWT_KEY!) as JwtPayload;
  } catch (err) {
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
  }
  try {
    await Joi.object({
      amount: Joi.number().min(5).required().label("amount"),
    }).validateAsync(req.body);
  } catch (error) {
    next(error);
  }
  const dev = await Developer.findByPk(userdata?.username);
  if (!dev) {
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
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
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
  }
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song_id"),
    }).validateAsync(req.body);
  } catch (error) {
    next(error);
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
        status: 400,
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
  interface JwtPayload {
    username: string;
    kuota: number;
  }
  let dev;
  let old_quota: number;
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      const error = new Error("Unauthorized");
      error.name = "Unauthorized";
      throw error;
    }
    const userdata = jwt.verify(token!, process.env.JWT_KEY!) as JwtPayload;
    dev = await Developer.findByPk(userdata.username);
    if (!dev) throw new Error();
  } catch (error) {
    next(error);
  }

  if (dev!.kuota < 50) {
    return res.status(400).send({
      message: "Not enough quota, please Top Up first!",
    });
  }
  old_quota = dev!.kuota;
  dev!.kuota -= 50;
  await dev!.save();

  const rating = await RatingReview.findAll();
  const comment = await Comment.findAll();

  //WRITE RATINGS.CSV
  const opts = {
    fields: ["song_id", "user_id", "rating", "review"],
  };
  let parser = new Parser(opts);
  fs.mkdirSync("storage/csv", { recursive: true });
  fs.writeFileSync("storage/csv/ratings.csv", parser.parse(rating), null);

  //WRITE COMMENTS.CSV
  opts.fields = ["id", "comment", "parent_id", "song_id", "user_id"];
  parser = new Parser(opts);
  fs.writeFileSync("storage/csv/comments.csv", parser.parse(comment), null);

  //ZIP CSV
  const zip = new AdmZip();
  zip.addLocalFile("storage/csv/ratings.csv");
  zip.addLocalFile("storage/csv/comments.csv");
  zip.writeZip("storage/csv/csv.zip");

  //DOWNLOAD CSV.ZIP
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const file = path.resolve(path.join(__dirname, "../../storage/csv/csv.zip"));
  return res.download(
    file,
    "csv.zip",
    {
      headers: { "Content-Type": "application/zip" },
    },
    (err) => {
      if (err) {
      } else {
        fs.unlinkSync("storage/csv/ratings.csv");
        fs.unlinkSync("storage/csv/comments.csv");
        fs.unlinkSync("storage/csv/csv.zip");
      }
    }
  );
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
