// tests/url.test.js
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Url = require("../models/Url");
const urlRoutes = require("../routes/urlRoutes");

const app = express();
app.use(express.json());
app.use("/", urlRoutes);

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/urlshortener_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Url.deleteMany(); // Clean up after each test
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("POST /shorten", () => {
  it("should create a short URL", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ longUrl: "https://www.google.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.shortUrl).toMatch(/http:\/\/localhost:5000\/\w{6}/);
  });

  it("should return 400 for invalid URL", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ longUrl: "invalid-url" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid or missing URL");
  });
});

describe("GET /:code", () => {
  it("should redirect to the original URL", async () => {
    const newUrl = new Url({
      originalUrl: "https://example.com",
      longUrl: "https://example.com",
      shortCode: "abc123",
    });
    await newUrl.save();

    const res = await request(app).get("/abc123");
    expect(res.statusCode).toBe(302); // Redirect
    expect(res.headers.location).toBe("https://example.com");
  });

  it("should return 404 for invalid code", async () => {
    const res = await request(app).get("/invalid");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("URL not found");
  });
});
