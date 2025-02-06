const Users = require("../../../models/User");
const db = require("../../../db/connect");
const { query } = require("express");

describe("Users", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getOneById", () => {
    it("resolves with user on successful db query", async () => {
      const testUser = {
        user_id: 1,
        email: "user@hotmail.com",
        password: 1234,
        user_type: "Teacher",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      const result = await Users.getOneById(1);

      expect(result).toBeInstanceOf(Users);
      expect(result.email).toBe("user@hotmail.com");
      expect(result.user_id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE user_id = $1;",
        [1]
      );
    });
    it("should throw an Error when a User is not found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(Users.getOneById(999)).rejects.toThrow(
        "Unable to locate user."
      );
    });
  });

  describe("getOneByEmail", () => {
    it("resolves with a user when a valid email is provided", async () => {
      const testUser = {
        user_id: 2,
        email: "test@example.com",
        password: "password",
        user_type: "Student",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      const result = await Users.getOneByEmail("test@example.com");

      expect(result).toEqual(testUser);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["test@example.com"]
      );
    });

    it("returns null when no user is found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      const result = await Users.getOneByEmail("nonexistent@example.com");

      expect(result).toBeNull();
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["nonexistent@example.com"]
      );
    });

    it("throws an error when a database query fails", async () => {
      jest
        .spyOn(db, "query")
        .mockRejectedValueOnce(new Error("Database error"));

      await expect(Users.getOneByEmail("test@example.com")).rejects.toThrow(
        "Database query failed"
      );
    });
  });

  describe("create", () => {
    it("resolves with an entry into users db", async () => {
      const userData = {
        email: "user@user.com",
        password: "1234",
        user_type: "Admin",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{ user_id: 1 }] });

      const mockUser = new Users({ ...userData, user_id: 1 });
      jest.spyOn(Users, "getOneById").mockResolvedValueOnce(mockUser);

      const result = await Users.create(userData);

      expect(result).toBeInstanceOf(Users);
      expect(result).toHaveProperty("user_id", 1);
      expect(result).toHaveProperty("email", "user@user.com");
      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING user_id;",
        ["user@user.com", "1234", "Admin"]
      );
    });
  });
});
