import { Context } from "koa";
import { User } from "../user/user.model";
import { createUser, findByEmail } from "../user/user.service";
import {
  ValidationError,
  ConflictError,
  UnauthorizedError,
} from "../../errors/AppError";
import { genJwt, genRefreshToken } from "./auth.service";

export async function login({ request, response }: Context) {
  const { body } = request;
  const { email, password } = body as Pick<User, "email" | "password">;

  if (!email || !password) {
    throw new ValidationError("Campos obrigatórios ausentes");
  }

  const user = await findByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Usuário não encontrado");
  }

  if (!(await user.compare(password, user.password))) {
    throw new UnauthorizedError("Senha inválida");
  }

  const { name, _id } = user;

  const jwt = genJwt({ email, name, _id });
  const refreshToken = genRefreshToken({ _id });

  if (!jwt) {
    throw new Error("Something went wrong gen jwt");
  }

  response.body = {
    accessToken: jwt,
    refreshToken,
    data: user.toJSON(),
    message: "Usuário logado com sucesso",
  };
}

export async function register({ request, response }: Context) {
  const { name, email, password } = request.body as Pick<
    User,
    "name" | "email" | "password"
  >;

  if (!name || !email || !password) {
    throw new ValidationError("Campos obrigatórios ausentes");
  }

  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw new ConflictError("Usuário com esse email já existe");
  }

  const newUser = await createUser({ name, email, password });

  response.status = 201;
  response.body = { message: "Usuário criado com sucesso", data: newUser };
}
