const request = require("supertest");
let app = require("../app");

describe("CREATE / title, context should have value", () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  test("CREATE / should response with 200 status code", async () => {
    const response = await request(app).post("/api/todo/create").send({
      title: "The dummy title for testing",
      context: "Test context",
    });
    expect(response.status).toBe(200);
  });
});

test("CREATE / Should specify json in the content-type header", async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).post("/api/todo/create").send({
    title: "The dummy title for testing",
    context: "Test context",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test('CREATE / should return JSON response"', async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).post("/api/todo/create").send({
    title: "The dummy title for testing",
    context: "Test context",
  });

  if (response.status === 200) {
    expect(response.body).toEqual({
      status: "sucess",
      statusCode: 0,
      isSuccess: true,
      message: "Success on insert",
      data: expect.any(String),
    });
  } else {
    expect(response.body).toEqual({
      status: "failed",
      statusCode: 1,
      isSuccess: false,
      message: "Error encountered while processing request.",
      error: expect.any(String),
    });
  }
});
