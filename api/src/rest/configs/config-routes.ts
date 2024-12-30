import Router from "@koa/router";
import Koa from "Koa";
import allRoutes from "../routes";

export function configRoutes(
  koaInstance: Koa
): Router<Koa.DefaultState, Koa.DefaultContext>[] {
  return allRoutes.map((route) => {
    koaInstance.use(route.routes());
    koaInstance.use(route.allowedMethods());
    return route;
  });
}
