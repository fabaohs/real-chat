import Router from "@koa/router";

import { login, register } from "../modules/auth/auth.controller";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/signin", login);
authRouter.post("/register", register);
