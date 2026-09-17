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
   * Created a TokenDataRequest interface that extends Request to add 2 properties to the type,
   * which let us add a "user" property to the request object and extract the
   * "email" property when verifying the token with the tokenSignedChecker method.
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

    // Removes the word Bearer from the token
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
