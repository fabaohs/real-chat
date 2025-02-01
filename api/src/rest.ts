import Koa from "koa";
import BodyParser from "koa-bodyparser";
import { configRoutes } from "./rest/configs/config-routes";
import { errorHandler } from "./rest/middlewares/errorHandler";

export function startServer() {
  const app = new Koa();
  app.use(errorHandler);

  app.use(BodyParser());

  configRoutes(app);

  app.use(async (ctx, next) => {
    ctx.response.status = 404;
    ctx.response.body = { message: "Recurso não encontrado" };

    await next();
  });

  app.use(async (ctx, next) => {
    await next();
    ctx.response.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    };
  });

  app.listen(5001, () => {
    console.log("REST API running on port 5001");
  });
}
