const webpack = require("webpack");
const axios = require("axios");
const MemoryFS = require("memory-fs");
const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const webpackConfig = require("@vue/cli-service/webpack.config");
const VueServerRenderer = require("vue-server-renderer");
const serverRender = require("./server-render");

const serverCompiler = webpack(webpackConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err;
  }

  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    webpackConfig.output.path,
    "vue-ssr-server-bundle.json"
  );

  bundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
  console.log("bundle created success");
});

const router = new Router();

router.get("*", async ctx => {
  if (!bundle) {
    console.log("wait a moment");
    return;
  }

  const clientManifestResp = await axios.get(
    "http://127.0.0.1:8000/vue-ssr-client-manifest.json"
  );
  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(
    path.join(__dirname, "../src/index.template.ejs"),
    "utf-8"
  );

  const render = VueServerRenderer.createBundleRenderer(bundle, {
    // runInNewContext: false,
    inject: false,
    clientManifest
  });

  await serverRender(ctx, render, template);
  console.log(ctx.body);
});

module.exports = router;
