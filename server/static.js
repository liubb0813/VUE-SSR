const Router = require("koa-router");
const send = require("koa-send");

const router = new Router({ prefix: "/dist" });

router.get("/*", async ctx => {
  await send(ctx, ctx.url);
});

module.exports = router;
