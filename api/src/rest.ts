import Koa from "koa";

export function startServer() {
  const app = new Koa();

  app.use(async (ctx) => {
    ctx.response.body = "Hello World";
    ctx.response.status = 200;

    return ctx.response;
  });

  app.listen(5001, () => {
    console.log("REST API running on port 3000");
  });
}
