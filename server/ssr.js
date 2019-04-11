const Router = require("koa-router");
const path = require("path");
const fs = require("fs");
const VueServerRenderer = require("vue-server-renderer");
const serverRender = require("./server-render");

const bundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const template = fs.readFileSync(
  path.join(__dirname, "../src/index.template.ejs"),
  "utf-8"
);
const render = VueServerRenderer.createBundleRenderer(bundle, {
  // runInNewContext: false,
  inject: false,
  clientManifest
});

const router = new Router();

router.get("*", async ctx => {
  await serverRender(ctx, render, template);
  console.log(ctx.body);
});

module.exports = router;
