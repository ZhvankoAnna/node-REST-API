const mongoose = require("mongoose");

const request = require("supertest");

const app = require("../../app");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("login response correct data", async () => {
    const loginData = {
      email: "anna@gmail.com",
      password: "123456",
    };

    const response = await request(app).post("/users/login").send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
