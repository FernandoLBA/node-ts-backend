import { hash, compare } from "bcryptjs";

/**
 * Encrypts the password
 * @param password
 * @returns
 */
export const encryptPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
};

/**
 * Compares whether the passwords match
 * @param password
 * @param hashedPassword
 * @returns
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};
