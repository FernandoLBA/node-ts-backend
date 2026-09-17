import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    res.send({ errors: errors.array() });

    return;
  }

  next();
};
