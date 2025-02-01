import { Context, Next } from "koa";
import { UnauthorizedError } from "../errors/AppError";
import { verifyToken } from "../modules/auth/auth.service";

export async function protectedRoutesHandler(ctx: Context, next: Next) {
  const authorization = ctx.header["authorization"];

  if (!authorization) {
    return new UnauthorizedError("Sessão expirada. Faça login novamente");
  }

  next();
}
