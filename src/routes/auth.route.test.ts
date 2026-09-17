import express from "express";
import request from "supertest";
import { router as authRouter } from "./auth.route";

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

describe("POST /api/auth/register validation", () => {
  it("rejects a missing name, invalid email and short password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "",
      email: "not-an-email",
      password: "123",
    });

    expect(response.status).toBe(422);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("POST /api/auth/login validation", () => {
  it("rejects an invalid email and missing password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "not-an-email",
    });

    expect(response.status).toBe(422);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
