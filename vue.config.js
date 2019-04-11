const path = require("path");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const merge = require("lodash.merge");

const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  publicPath: isDev ? "http://127.0.0.1:8000" : "",
  configureWebpack: () => ({
    target: TARGET_NODE ? "node" : "web",
    devtool: "source-map",
    entry: path.join(__dirname, `./src/entry-${target}.js`),
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: Object.keys(require("./package.json").devDependencies),
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3
      }
    },
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ],
    devServer: {
      port: 8000,
      host: "0.0.0.0",
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }),
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
};
