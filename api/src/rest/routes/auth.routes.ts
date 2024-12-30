import Router from "@koa/router";

import { login } from "./auth.controller";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", login);
