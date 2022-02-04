const path = require("path");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const base = require("./webpack.base");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(base, {
  entry: path.resolve(__dirname, "../entry-client.js"),
  output: {
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // "vue-style-loader",
          {
            loader: "css-loader",
            // options: {
            //   url: false,
            // },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new MiniCssExtractPlugin(),
  ],
});
