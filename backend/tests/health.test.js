const request = require("supertest");
const app = require("../src/server");

describe("Scholarship Workflow API", () => {
  test("GET / returns the API status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("running");
    expect(response.body.message).toBe(
      "Automated Scholarship Application Workflow API"
    );
  });

  test("GET /api/health returns healthy status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "healthy" });
  });
});