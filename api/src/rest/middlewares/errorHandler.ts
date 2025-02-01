import { Context, Next } from "koa";
import { AppError } from "../errors/AppError";

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error: any) {
    console.error("Error:", error);

    if (error instanceof AppError) {
      ctx.status = error.statusCode;
      ctx.body = {
        message: error.message,
        details: error.details,
      };
      return;
    }

    ctx.status = 500;
    ctx.body = {
      message: "Erro interno do servidor",
      details: error.message,
    };
  }
}
