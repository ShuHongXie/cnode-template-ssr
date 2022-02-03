const path = require("path");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  entry: path.resolve(__dirname, "../entry-server.js"),
  devtool: "source-map",
  target: "node",
  mode: "development",
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../output"),
  },
  plugins: [new VueSSRServerPlugin(), new VueLoaderPlugin()],
});
