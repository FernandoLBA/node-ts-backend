import { hash, compare } from "bcryptjs";

/**
 * Encripta la contraseña
 * @param password
 * @returns
 */
export const encryptPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
};

/**
 * Compara si las contraseñas coinciden
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
