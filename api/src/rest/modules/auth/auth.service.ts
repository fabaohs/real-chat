import { User } from "./../user/user.model";
import jwt from "jsonwebtoken";

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
    String(process.env.JWT_SECRET),
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
    String(process.env.JWT_SECRET),
    {
      expiresIn: "1d",
    }
  );
}
