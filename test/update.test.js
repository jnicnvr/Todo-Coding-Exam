const request = require("supertest");
let app = require("../app");

describe("UPDATE / page, limit, sort and order should have value", () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  test("UPDATE / should response with 200 status code", async () => {
    const response = await request(app).patch("/api/todo/update").send({
      id: "123",
      title: "2222222222222",
      context: "Test context",
    });
    expect(response.status).toBe(200);
  });
});

test("UPDATE / Should specify json in the content-type header", async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).post("/api/todo/update").send({
    id: "123",
    title: "22222222",
    context: "Test context",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});
