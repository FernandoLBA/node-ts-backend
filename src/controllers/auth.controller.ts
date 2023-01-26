import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services";
import { handleHttpError } from "../utils/error.handle";

/**
 *
 * @param req
 * @param res
 */
export const registerUser = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerUserService(body);

    res.send({
      message: typeof response === "string" ? response : "Usuario registrado",
      data: typeof response === "string" ? {} : response,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTERING_USER", error, 500);
  }
};

/**
 *
 * @param req
 * @param res
 */
export const loginUser = async ({ body }: Request, res: Response) => {
  try {
    let response = await loginUserService(body);

    res.send({
      message: typeof response === "string" ? response : "Usuario logueado",
      data: typeof response === "string" ? {} : response,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGING_IN_USER", error, 500);
  }
};
