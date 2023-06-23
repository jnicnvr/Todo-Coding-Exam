const request = require("supertest");
let app = require("../app");

describe("DELETE / id should have value", () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  test("DELETE / should response with 200 status code", async () => {
    const response = await request(app).delete("/api/todo/delete").send({
      id: "ae65ff72-4446-43a5-9022-dd742e8eae96",
    });
    expect(response.status).toBe(200);
  });
});

test("DELETE / Should specify json in the content-type header", async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).delete("/api/todo/delete").send({
    id: "ae65ff72-4446-43a5-9022-dd742e8eae96",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test('DELETE / should return JSON response"', async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).delete("/api/todo/delete").send({
    id: "ae65ff72-4446-43a5-9022-dd742e8eae96",
  });

  if (response.status === 200) {
    expect(response.body).toEqual({
      status: "sucess",
      statusCode: 0,
      isSuccess: true,
      message: "Deleted",
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
