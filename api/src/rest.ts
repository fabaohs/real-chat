import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { configRoutes } from "./rest/configs/config-routes";
import { errorHandler } from "./rest/middlewares/errorHandler";

export function startServer() {
  const app = new Koa();
  app.use(errorHandler);

  app.use(bodyParser());

  configRoutes(app);

  app.use(async (ctx, next) => {
    await next();

    ctx.response.status = 404;
    ctx.response.body = { message: "Recurso não encontrado" };
  });

  app.listen(5001, () => {
    console.log("REST API running on port 5001");
  });
}
