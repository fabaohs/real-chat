import { User } from "./user.model";

export async function findByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function createUser(
  user: Pick<User, "name" | "email" | "password">
) {
  const newUser = await User.create(user);
  return newUser;
}
