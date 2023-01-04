// npm
import { Request, Response } from "express";

// app
import AuthService from "../../services/auth-svc";

class AuthCtrl {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const token = await AuthService.login(username, password);

    if (token) {
      return res.json({
        token,
      });
    } else {
      return res.status(401).json({
        message: "The username and password your provided are invalid",
      });
    }
  }
}

export { AuthCtrl };
