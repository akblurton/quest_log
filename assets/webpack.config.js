/* eslint-env node */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const devMode = options.mode !== "production";
  return {
    devServer: {
      port: 8888,
      compress: true,
      hot: true,
      host: "0.0.0.0",
      hotOnly: true,
      inline: true,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:4000",
        "/dashboard": "http://localhost:4000",
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    entry: {
      app: ["./js/main.js"],
    },
    output: {
      filename: devMode ? "js/[name].js" : "js/[name].js?[hash]",
      path: path.resolve(__dirname, "../priv/static/"),
      publicPath: "/",
    },
    devtool: devMode ? "source-map" : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "css/app.css" }),
      new HtmlWebpackPlugin({
        title: "Video Game Journal (Title Pending)",
        template: "./html/index.ejs",
      }),
    ],
  };
};
