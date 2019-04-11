const Koa = require("koa");
const path = require("path");
const send = require("koa-send");
const Static = require("koa-static");
const staticRouter = require("./static");

const isDev = process.env.NODE_ENV === "development";

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    console.log(`running on ${ctx.url}`);
    await next();
  } catch (e) {
    console.log(e);
    if (isDev) {
      ctx.body = e.message;
    } else {
      ctx.body = "please try again";
    }
  }
});

app.use(Static(path.join(__dirname, "../src/")));
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());

app.use(async (ctx, next) => {
  if (ctx.url === "/favicon.ico") {
    await send(ctx, "/favicon.ico", {
      root: path.join(__dirname, "../public/")
    });
  } else {
    await next();
  }
});

let pageRouter;
if (isDev) {
  pageRouter = require("./dev-ssr");
} else {
  pageRouter = require("./ssr");
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.POST || 3333;

app.listen(PORT, HOST, () => {
  console.log("server is running on http://127.0.0.1:3333");
});
