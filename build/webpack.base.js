const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
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
        options: {
          prettify: false,
        },
      },
      {
        test: /\.png/,
        type: "asset",
        generator: {
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          //打包后对资源的引入，文件命名已经有/img了
          publicPath: "./",
        },
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
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
