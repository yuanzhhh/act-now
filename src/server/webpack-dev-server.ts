const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const hotMid = require("webpack-hot-middleware");
const Router = require('@koa/router');
const c2k = require('koa-connect');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

import webpackConfig from './webpack.config';
import * as paths from '../paths';

const keyOpts = {
  key: fs.readFileSync(path.resolve(__dirname, '../../src/server/privatekey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../src/server/certificate.pem')),
};

const koaDevMiddleware = (devMiddleware: any) =>
  async (ctx: any, next: any) =>
  await new Promise((resolve) => {
    devMiddleware(ctx.req, {
      end: (content: any) => {
        ctx.body = content;

        resolve(false);
      },
      setHeader: (name: string, value: string) => ctx.set(name, value),
    }, () => resolve(true));
  }) ? next() : null;

const koaHotMiddleware = (hotMiddleware: any) =>
  async (ctx: any, next: any) =>
  next(await new Promise((resolve) =>
    hotMiddleware(ctx.req, ctx.res, resolve)));

interface ServerOptions {
  env: 'development' | 'production';
  entryPath: string | undefined
};

export default async ({ env, entryPath }: ServerOptions) => {
  const app = new Koa();
  const router = new Router();

  let actConfig = await paths.actConfig();
  const config = await webpackConfig({ env, entryPath, actConfig });
  const compiler = webpack(config);

  const hotCompiler = hotMid(compiler);
  const instance = middleware(compiler, {
    quiet: true,
    noInfo: true,
    logger: {
      info: () => {
        /**
         * Webpack compiler log
         */
      },
      warn: (warn: string) => console.log(warn),
      error: (err: string) => console.log(err),
    },
    publicPath: config.output.publicPath,
  });

  for (let key in actConfig.proxys)
    app.use(c2k(createProxyMiddleware(key, Object.assign(actConfig.proxys[key], {}))));

  app.use(router.routes(), router.allowedMethods());
  app.use(koaDevMiddleware(instance));
  app.use(koaHotMiddleware(hotCompiler));

  https.createServer(keyOpts, app.callback()).listen(actConfig.protocol['https-port']);
  http.createServer(app.callback()).listen(actConfig.protocol['http-port']);
}
