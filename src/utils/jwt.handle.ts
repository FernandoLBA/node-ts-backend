import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET;

/**
 * Crea un token firmado
 * @param user
 */
export const tokenSignedGenerator = (email: string) => {
  try {
    const accessToken = sign({ email }, JWT_SECRET, { expiresIn: "2h" });

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Verifica que el token tenga la firma
 * @param tokenJwt
 * @returns
 */
export const tokenSignedChecker = (tokenJwt: string) => {
  try {
    return verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
};
