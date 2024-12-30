import Koa from "koa";
import BodyParser from "koa-bodyparser";
import { configRoutes } from "./rest/configs/config-routes";

export function startServer() {
  const app = new Koa();

  app.use(BodyParser());

  configRoutes(app);

  app.listen(5001, () => {
    console.log("REST API running on port 5001");
  });
}
