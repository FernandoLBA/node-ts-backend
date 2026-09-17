import { comparePassword, encryptPassword } from "./password.handle";

describe("password.handle", () => {
  it("encrypts a password into a different string", async () => {
    const hashed = await encryptPassword("secret123");

    expect(hashed).not.toBe("secret123");
  });

  it("confirms a matching password", async () => {
    const hashed = await encryptPassword("secret123");

    await expect(comparePassword("secret123", hashed)).resolves.toBe(true);
  });

  it("rejects a non-matching password", async () => {
    const hashed = await encryptPassword("secret123");

    await expect(comparePassword("wrong-password", hashed)).resolves.toBe(false);
  });
});
