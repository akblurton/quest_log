/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const DashboardPlugin = require("webpack-dashboard/plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const devMode = options.mode !== "production";
  const createConfig = (target) => ({
    mode: devMode ? "development" : "production",
    name: target,
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    entry: {
      main: [`~/${target}.js`],
    },
    output: {
      filename: devMode ? "[name].js" : "[name].js?[hash]",
      path: path.resolve(__dirname, "dist", target),
      publicPath: `/dist/${target}/`,
      ...(target === "web" ? {} : { libraryTarget: "commonjs2" }),
    },
    devtool: devMode || target === "node" ? "source-map" : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              caller: { target },
            },
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
                limit: Math.pow(2, 10), // 1KB
                emitFile: target === "web",
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
                limit: Math.pow(2, 10), // 1KB
                publicPath: "/dist/web/",
                emitFile: target === "web",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ["node_modules"],
      alias: {
        "~": path.resolve(__dirname, "src"),
        "#": path.resolve(__dirname, "assets"),
      },
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({ filename: "css/[name].css?[contenthash]" }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development",
      }),
      target === "web" && new webpack.HotModuleReplacementPlugin(),
      devMode && target === "web" && new DashboardPlugin({ port: 3001 }),
      devMode &&
        target === "web" &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: "whm",
          },
        }),
      new LoadablePlugin(),
      new CleanWebpackPlugin({ verbose: true }),
    ].filter(Boolean),
    externals: target === "node" ? [nodeExternals()] : [],
    target,
  });

  return [createConfig("web"), createConfig("node")];
};
