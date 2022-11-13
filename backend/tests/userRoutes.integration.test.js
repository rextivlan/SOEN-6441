const request = require("supertest");

jest.setTimeout(10000);

// An Instance of an express app
const app = require("../app");

// Describing Tests
describe("Integration test for users", () => {
  const payload = {
    email: "tom@hanks.in",
    password: "123456",
  };
  // Test Suite - 1 Authenticate User
  it("POST /users/login - success - authenticate user", async () => {
    const { body, statusCode } = await request(app)
      .post("/users/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(body.success).toEqual(true);
    expect(body.user_id).toEqual(2);
    expect(statusCode).toBe(200);
  });

  const registerPayload = {
    name: "Lone Walker",
    email: "lone@walker.in",
    password: "123456",
  };
  // Test Suite - 2 Register User
  it("POST /users/register - success - register user", async () => {
    const { body, statusCode } = await request(app)
      .post("/users/register")
      .send(registerPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(body.success).toEqual(true);
    expect(statusCode).toBe(201);
  });
});
