import * as request from "supertest";
import app from "../app";
describe("Endpoint Post", () => {

  it("POST: create Post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("user_id", "1")
      .set("Content-Type", "application/json")
      .send({ userId: 5 })

    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toEqual(5);
    expect(response.body).toHaveProperty("id");
  })

  it("does not creates a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("user_id", "1")
      .set("Content-Type", "application/json")
      .send({ userId: 1000 })

    expect(response.statusCode).toBe(400);
  })


})