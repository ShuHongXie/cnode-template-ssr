const path = require("path");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  entry: path.resolve(__dirname, "../entry-server.js"),
  devtool: "source-map",
  target: "node",
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../output"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "vue-style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [new VueSSRServerPlugin()],
});
