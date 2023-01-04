import jwt from "jsonwebtoken";

import config from "../config";

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<string | null> {
    if (username === "admin" && password === "admin") {
      const myToken = jwt.sign({ user: "admin" }, config.jwt.secret);

      return myToken;
    }

    return null;
  }
}

export { AuthService };
