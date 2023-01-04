import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../../config";

export default async function hasValidJWT(
  req: any,
  res: Response,
  next: NextFunction
) {
  const bearerToken: string = req.get("Authorization");
  const tokenParts = bearerToken.split(" ");

  if (tokenParts.length != 2) {
    return res.status(401).send({ message: "Invalid token" });
  }

  const token = tokenParts[1];

  try {
    jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }

  return next();
}

export { hasValidJWT };
