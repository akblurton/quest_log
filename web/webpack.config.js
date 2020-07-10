/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

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
      app: ["reset.css/reset.css", "./js/main.js"],
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
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode,
              },
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "@svgr/webpack",
              options: {
                babel: false,
                replaceAttrValues: {
                  "#6c63ff": "currentColor",
                },
                dimensions: false,
              },
            },
            {
              loader: "url-loader",
              options: {
                limit: Math.pow(2, 13), // 8KB
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|webp|mp4|webm|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: Math.pow(2, 13), // 8KB
                publicPath: devMode ? "/" : "/static",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "js"), __dirname],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({ filename: "css/[name].css?[contenthash]" }),
      new HtmlWebpackPlugin({
        title: "Video Game Journal (Title Pending)",
        template: "./html/index.ejs",
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development",
      }),
    ],
  };
};
