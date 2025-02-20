const { describe, it, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API Suite Test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("Should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us page");
    });
  });

  describe("/login:post", () => {
    it("Should request the login and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "JoaoM", password: "1234" })
        .expect(200);

      assert.strictEqual(response.text, "Log in succeeded!");
    });

    it("Should request the login and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "joao", password: "1234" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Log in failed!");
    });

    it("Should request an unexisting page and return HTTP Status 404", async () => {
      const response = await supertest(app).get("/hi").expect(404);

      assert.strictEqual(response.text, "not found!");
    });
  });
});
