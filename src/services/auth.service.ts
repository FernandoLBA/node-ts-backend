import { Auth, User } from "../interfaces";
import { UserModel } from "../models";
import {
  comparePassword,
  encryptPassword,
  tokenSignedGenerator
} from "../utils";

/**
 *
 * @param user
 * @returns
 */
export const registerUserService = async (user: User) => {
  const checkUser = await UserModel.findOne({ email: user.email });

  if (checkUser) return "USER_ALREADY_EXISTS";

  const hashedPassword = await encryptPassword(user.password);

  user.password = hashedPassword;

  const response = await UserModel.create(user);

  return response;
};

/**
 *
 * @param userData
 * @returns
 */
export const loginUserService = async (authData: Auth) => {
  const authUser = await UserModel.findOne({ email: authData.email });

  if (!authUser) return "USER_NOT_FOUND";

  const hashedPassword = authUser.password;

  const passwordChecker = await comparePassword(
    authData.password,
    hashedPassword
  );

  if (!passwordChecker) return "INCORRECT_PASSWORD";

  const token = tokenSignedGenerator(authUser.email);

  return { token, user: authUser };
};
