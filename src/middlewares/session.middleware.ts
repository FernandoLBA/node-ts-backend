import { NextFunction, Response } from "express";
import { TokenDataRequest } from "../interfaces";
import { UserModel } from "../models";
import { tokenSignedChecker, handleHttpError } from "../utils";

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const sessionMiddleware = async (
  /**
   * Creé una interface TokenDataRequest que extiende de request, para agregar 2 propiedades al type,
   * Las cuales me permiten agregar una propiedad "user" al objeto request y poder extraer la
   * propiedad "email" al verificar el token con el método tokenSignedChecker.
   */
  req: TokenDataRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      handleHttpError(res, "AUTHORIZATION_HEADER_MISSING", "", 401);

      return;
    }

    // Remueve la palabra Bearer del token
    const token: string = authorization.split(" ").pop() || "";
    const { email } = tokenSignedChecker(token.toString()) as TokenDataRequest;

    if (!email ) {
      handleHttpError(res, "AUTHENTICATION_ERROR", "", 401);

      return;
    }

    const user = await UserModel.findOne({ email });

    user?.set("password", undefined, { strict: false });
    user?.set("username", undefined, { strict: false });
    user?.set("name", undefined, { strict: false });
    user?.set("age", undefined, { strict: false });

    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "ERROR_AUTHORIZATION_MID", error, 500);
  }
};
