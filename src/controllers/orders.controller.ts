import { Request, Response } from "express";
import { handleHttpError } from "../utils";
import { TokenDataRequest } from "../interfaces";

/**
 * Lists all Orders
 * @param req
 * @param res
 */
export const getOrders = (req: TokenDataRequest, res: Response) => {
  try {
    res.send({
      message: "Only visible to users with an active JWT session",
      user: req.user,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_ITEMS");
  }
};
