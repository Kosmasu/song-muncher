import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { SpotifyAPIError } from "../exceptions/SpotifyAPIError.js";
import { AxiosError } from "axios";
import Joi from "joi";

export const GlobalErrorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  console.log("typeof err:", typeof err);
  if (err.name === "Unauthorized") {
    return res.status(401).send({
      message: "Unauthorized",
    })
  }
  if (err instanceof SpotifyAPIError) {
    return res.status(err.status_code).send({
      status: err.status_code,
      message: err.message,
    });
  }
  if (err instanceof AxiosError) {
    return res.status(err.response?.status as number).send({
      message: "Something went wrong while fetching datas",
      data: err.response?.data,
    });
  }
  if (err instanceof Joi.ValidationError) {
    return res.status(400).send({
      message: err.message,
    });
  }
  return res.status(500).send({
    status: 500,
    message: "Something went wrong!",
  });
};
