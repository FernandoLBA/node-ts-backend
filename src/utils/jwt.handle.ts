import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET;

/**
 * Creates a signed token
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
 * Verifies that the token has a valid signature
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
