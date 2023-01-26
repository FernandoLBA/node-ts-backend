import { Request, Response } from "express";
import { handleHttpError } from "../utils";
import { TokenDataRequest } from "../interfaces";

/**
 * Lista todos los Orders
 * @param req
 * @param res
 */
export const getOrders = (req: TokenDataRequest, res: Response) => {
  try {
    res.send({
      message: "Solo lo ven personas con una sesión JWT activa",
      user: req.user,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_ITEMS");
  }
};
