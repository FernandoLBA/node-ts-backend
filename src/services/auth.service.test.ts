import { loginUserService, registerUserService } from "./auth.service";
import { UserModel } from "../models";
import { encryptPassword } from "../utils/password.handle";

jest.mock("../models", () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const mockedFindOne = UserModel.findOne as jest.Mock;
const mockedCreate = UserModel.create as jest.Mock;

describe("auth.service", () => {
  describe("registerUserService", () => {
    it("returns USER_ALREADY_EXISTS when the email is taken", async () => {
      mockedFindOne.mockResolvedValue({ email: "a@a.com" });

      const result = await registerUserService({
        name: "Ana",
        description: "",
        email: "a@a.com",
        password: "123456",
      });

      expect(result).toBe("USER_ALREADY_EXISTS");
      expect(mockedCreate).not.toHaveBeenCalled();
    });

    it("hashes the password before creating the user", async () => {
      mockedFindOne.mockResolvedValue(null);
      mockedCreate.mockImplementation((user) => user);

      const result = await registerUserService({
        name: "Ana",
        description: "",
        email: "a@a.com",
        password: "123456",
      });

      expect(mockedCreate).toHaveBeenCalledTimes(1);
      expect((result as any).password).not.toBe("123456");
    });
  });

  describe("loginUserService", () => {
    it("returns USER_NOT_FOUND when there is no matching user", async () => {
      mockedFindOne.mockResolvedValue(null);

      const result = await loginUserService({
        email: "x@x.com",
        password: "123456",
      });

      expect(result).toBe("USER_NOT_FOUND");
    });

    it("returns INCORRECT_PASSWORD when the password does not match", async () => {
      mockedFindOne.mockResolvedValue({
        email: "a@a.com",
        password: await encryptPassword("correct-pass"),
      });

      const result = await loginUserService({
        email: "a@a.com",
        password: "wrong-pass",
      });

      expect(result).toBe("INCORRECT_PASSWORD");
    });

    it("returns a token and the user when credentials are valid", async () => {
      mockedFindOne.mockResolvedValue({
        email: "a@a.com",
        password: await encryptPassword("correct-pass"),
      });

      const result = await loginUserService({
        email: "a@a.com",
        password: "correct-pass",
      });

      expect((result as any).token).toEqual(expect.any(String));
      expect((result as any).user.email).toBe("a@a.com");
    });
  });
});
