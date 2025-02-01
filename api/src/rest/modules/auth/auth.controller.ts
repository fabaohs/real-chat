import { Context } from "koa";
import { User } from "../user/user.model";
import { createUser, findByEmail } from "../user/user.service";
import { ValidationError, ConflictError } from "../../errors/AppError";

export async function login({ request, response }: Context) {
  const { body } = request;
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
