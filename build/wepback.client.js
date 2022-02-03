const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const base = require("./webpack.base");
const { merge } = require("webpack-merge");

module.exports = merge(base, {
  entry: path.resolve(__dirname, "../entry-client.js"),
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../output"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "manifest",
          minChunks: Infinity,
        },
      },
    },
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new VueLoaderPlugin(),
  ],
});
