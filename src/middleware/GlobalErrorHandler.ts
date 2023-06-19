import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { SpotifyAPIError } from "../exceptions/SpotifyAPIError.js";
import { BadRequestMessage, DeveloperNotFound, RateRevComNotFOund, Unauthorized } from "../exceptions/AnyError.js";
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
  if (err instanceof Unauthorized) {
    return res.status(401).send({
      status: err.status_code,
      message: err.message,
    })
  }
  if (err instanceof DeveloperNotFound) {
    return res.status(404).send({
      status: err.status_code,
      message: err.message,
    })
  }
  if (err instanceof RateRevComNotFOund) {
    return res.status(404).send({
      status: err.status_code,
      message: err.message,
    })
  }
  if (err instanceof BadRequestMessage) {
    return res.status(400).send({
      status: err.status_code,
      message: err.message,
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
