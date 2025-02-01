import { User } from "./../user/user.model";
import jwt from "jsonwebtoken";

const jwtSecret = String(process.env.JWT_SECRET);

export async function signIn() {}

export function genJwt({
  _id,
  email,
  name,
}: Pick<User, "email" | "name" | "_id">) {
  return jwt.sign(
    {
      _id,
      email,
      name,
    },
    jwtSecret,
    {
      expiresIn: "1h",
    }
  );
}

export function genRefreshToken({ _id }: Pick<User, "_id">) {
  return jwt.sign(
    {
      _id,
    },
    jwtSecret,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtSecret);
}
