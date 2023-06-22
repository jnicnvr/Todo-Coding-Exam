const request = require("supertest");
let app = require("../app");

describe("POST / page, limit, sort and order should have value", () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  test("POST / should response with 200 status code", async () => {
    const response = await request(app)
      .post("/api/todo/pagination-search")
      .send({
        page: 1,
        limit: 10,
        sort: "createdAt",
        order: "-1",
      });
    expect(response.status).toBe(200);
  });
});

test("POST / Should specify json in the content-type header", async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).post("/api/todo/pagination-search").send({
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "-1",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test('POST / should return JSON response"', async () => {
  jest.setTimeout(10000); // Increase the timeout to 10000 ms
  const response = await request(app).post("/api/todo/pagination-search").send({
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "-1",
  });

  if (response.status === 200) {
    expect(response.body).toEqual({
      status: "sucess",
      statusCode: 0,
      isSuccess: true,
      message: "Success on insert",
      data: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          todoNo: expect.any(Number),
        }),
      ]),
    });
  } else {
    expect(response.body).toEqual({
      status: "failed",
      statusCode: 1,
      isSuccess: false,
      message: "Error encountered while processing request.",
      error: {},
    });
  }
});
