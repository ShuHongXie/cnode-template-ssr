const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".vue", ".less"],
  },
  output: {
    path: path.resolve(__dirname, "../output"),
    publicPath: "/output/",
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          babelrc: false, // 不采用.babelrc的配置
          presets: ["@babel/preset-env"],
          plugins: ["dynamic-import-webpack"],
        },
        exclude: (file) =>
          /node_modules/.test(file) && !/(\.vue|\.js)/.test(file),
      },
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          // MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          // [css-loader](/loaders/css-loader)
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
          // MiniCssExtractPlugin.loader,
          "vue-style-loader",
          // "style-loader",
          "css-loader",
          "less-loader",
          // {
          //   loader: "postcss-loader",
          // },
        ],
      },
    ],
  },
  plugins: [],
};
