const mongoose = require("mongoose");
import * as mockUser from "./user.json";
import controller from "./controller";

jest.mock("uuid/v4", () => {
  return {
    default: () => "7d141f2d-6a90-4ea7-bcaa-0ba2009e052b"
  };
});

let connection;
let db;

describe("User.Controller", () => {
  beforeAll(async () => {
    connection = await mongoose.connect(
      "mongodb://mongo:27017/holiday",
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
    db = connection.connections[0];
  });
  beforeEach(async () => {
    await db.collection("users").deleteMany({});
    await db.collection("users").insertOne({ ...mockUser });
  });
  describe("findUser", () => {
    it("should return a known user", async () => {
      const ret = await controller.findUser({ id: "12345" });
      expect(ret).toEqual({
        user: { ...mockUser, created: new Date(mockUser.created) }
      });
    });
    it("should return an error and null value", async () => {
      const ret = await controller.findUser({ id: "abcde" });
      expect(ret).toEqual({ error: "User not found" });
    });
  });
  describe("createUser", () => {
    beforeAll(() => {
      global.Date.now = jest
        .fn()
        .mockImplementation(() => new Date("2020-09-14T11:00:00.000Z"));
    });
    it("should save an return the same user", async () => {
      const ret = await controller.createUser({
        familyName: "test",
        givenName: "tester",
        email: "test@t.com"
      });
      expect(ret).toEqual({
        user: {
          id: "7d141f2d-6a90-4ea7-bcaa-0ba2009e052b",
          familyName: "test",
          givenName: "tester",
          email: "test@t.com",
          created: new Date("2020-09-14T11:00:00.000Z")
        }
      });
    });
    it("should error and return existing user", async () => {
      const ret = await controller.createUser({
        givenName: "dominic",
        familyName: "scanlan",
        email: "d@d.com"
      });
      expect(ret).toEqual({
        error: "User Already Exists"
      });
    });
    it("should fail validation", async () => {
      const ret = await controller.createUser({
        familyName: "test",
        givenName: "tester",
        email: "test.com"
      });

      expect(ret).toEqual({
        error: 'child "email" fails because ["email" must be a valid email]'
      });
    });
  });
  describe("updateUser", () => {
    beforeEach(async () => {
      await db.collection("users").deleteMany({});
      await db.collection("users").insertOne({ ...mockUser });
    });
    it("should update the existing user", async () => {
      const ret = await controller.updateUser({
        id: "12345",
        familyName: "test",
        givenName: "tester",
        email: "test@t.com"
      });
      expect(ret).toEqual({
        user: {
          id: "12345",
          familyName: "test",
          givenName: "tester",
          email: "test@t.com",
          created: new Date(mockUser.created)
        }
      });
    });

    it("should not find user and error", async () => {
      const ret = await controller.updateUser({
        id: "abcde",
        familyName: "test",
        givenName: "tester",
        email: "test@t.com"
      });
      expect(ret).toEqual({
        error: "User Not Found"
      });
    });
    it("should fail validation", async () => {
      const ret = await controller.updateUser({
        id: "12345",
        familyName: "test",
        givenName: "tester",
        email: "test.com"
      });
      expect(ret).toEqual({
        error: 'child "email" fails because ["email" must be a valid email]'
      });
    });
  });
  afterAll(async () => {
    await connection.close();
  });
});
