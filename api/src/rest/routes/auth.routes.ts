import Router from "@koa/router";

import { login } from "../modules/auth/auth.controller";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", login);
