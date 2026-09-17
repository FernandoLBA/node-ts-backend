import { JwtPayload } from "jsonwebtoken";
import { tokenSignedChecker, tokenSignedGenerator } from "./jwt.handle";

describe("jwt.handle", () => {
  it("generates a token that verifies back to the original email", () => {
    const token = tokenSignedGenerator("user@example.com") as string;

    expect(typeof token).toBe("string");

    const payload = tokenSignedChecker(token) as JwtPayload;

    expect(payload.email).toBe("user@example.com");
  });

  it("throws when verifying an invalid token", () => {
    expect(() => tokenSignedChecker("not-a-real-token")).toThrow();
  });
});
