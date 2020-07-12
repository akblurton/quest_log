require("source-map-support").install();

const path = require("path");
const Koa = require("koa");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const e2k = require("express-to-koa");
const { env, ...options } = require("yargs").argv;
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";

async function start() {
  const compiler = webpack(webpackConfig(env, options));
  const wpMiddleware = middleware(compiler, {
    publicPath: "/dist/web",
    serverSideRender: true,
    writeToDisk(filePath) {
      return (
        /loadable-stats/.test(filePath) || /dist(\/||\\)node/.test(filePath)
      );
    },
  });
  const app = new Koa();
  const nodeStats = path.resolve(__dirname, "./dist/node/loadable-stats.json");
  const webStats = path.resolve(__dirname, "./dist/web/loadable-stats.json");

  app.use(e2k(wpMiddleware));
  app.use(e2k(hotMiddleware(compiler.compilers[0])));
  app.use(async function devSSR(ctx) {
    const nodeExtractor = new ChunkExtractor({
      statsFile: nodeStats,
    });
    const { default: App } = nodeExtractor.requireEntrypoint();

    const sheet = new ServerStyleSheet();
    const webExtractor = new ChunkExtractor({
      statsFile: webStats,
      inputFileSystem: wpMiddleware.fileSystem,
    });
    const jsx = webExtractor.collectChunks(
      sheet.collectStyles(<App Router={StaticRouter} />)
    );
    try {
      const html = renderToString(jsx);
      ctx.type = "text/html";
      ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <title>Quest Log</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700&display=swap" rel="stylesheet">
            ${webExtractor.getLinkTags()}
            ${webExtractor.getStyleTags()}
            ${sheet.getStyleTags()}
          </head>
          <body>
            <div id="main">${html}</div>
            ${webExtractor.getScriptTags()}
          </body>
        </html>
      `;
    } catch (e) {
      console.error(e);
      ctx.body = "Error";
      ctx.status = 500;
    } finally {
      sheet.seal();
    }
  });
  app.listen(3000);
}

start();
