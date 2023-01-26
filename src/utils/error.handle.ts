import { Response } from "express";

export const handleHttpError = (
  res: Response,
  error: string,
  errorRaw?: unknown,
  statusCode?: number
) => {
  console.log(errorRaw);
  res.status(statusCode || 500);
  res.send({ error });
};
