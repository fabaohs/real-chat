import Router from "@koa/router";
import Koa from "Koa";
import cors from "@koa/cors";
import allRoutes from "../routes";

export function configRoutes(
  koaInstance: Koa
): Router<Koa.DefaultState, Koa.DefaultContext>[] {
  koaInstance.use(
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  return allRoutes.map((route) => {
    koaInstance.use(route.routes());
    koaInstance.use(route.allowedMethods());
    return route;
  });
}
