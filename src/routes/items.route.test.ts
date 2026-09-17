import express from "express";
import request from "supertest";
import { router as itemsRouter } from "./items.route";

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);

describe("POST /api/items validation", () => {
  it("rejects a request missing all required fields", async () => {
    const response = await request(app).post("/api/items").send({});

    expect(response.status).toBe(422);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it("rejects an invalid gas value", async () => {
    const response = await request(app).post("/api/items").send({
      name: "Model 3",
      color: "red",
      gas: "diesel",
      year: 2023,
      description: "A car",
      price: 40000,
    });

    expect(response.status).toBe(422);
  });
});

describe("GET /api/items/:id validation", () => {
  it("rejects a non-mongo-id", async () => {
    const response = await request(app).get("/api/items/not-a-valid-id");

    expect(response.status).toBe(422);
  });
});
