const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const hotMid = require("webpack-hot-middleware");
const Router = require('@koa/router');
const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa-connect');
const path = require('path');

import webpackConfig from './webpack.config';
import * as paths from '../paths';

const keyOpts = {
  key: fs.readFileSync(path.resolve(__dirname, '../../src/server/privatekey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../src/server/certificate.pem')),
};

function koaDevMiddleware(devMiddleware: any) {
  return async function newDevMiddleware(ctx: any, next: any) {
    const err = await new Promise((resolve) => {
      devMiddleware(ctx.req, {
        end: (content: any) => {
          ctx.body = content;

          resolve(false);
        },
        setHeader: (name: string, value: string) => ctx.set(name, value),
      }, () => resolve(true));
    });

    if (err) return next();

    return null;
  };
};

function koaHotMiddleware(hotMiddleware: any) {
  return async (ctx: any, next: any) =>
    next(await new Promise((resolve) => hotMiddleware(ctx.req, ctx.res, resolve)));
};

interface ServerOptions {
  env: 'development' | 'production';
  entryPath: string | undefined
};

export default async ({ env, entryPath }: ServerOptions) => {
  const app = new Koa();
  const router = new Router();

  const config = webpackConfig({ env, entryPath });
  const compiler = webpack(config);

  const hotCompiler = hotMid(compiler);
  const instance = middleware(compiler, {
    quiet: true,
    noInfo: true,
    logger: {
      info: () => {},
      error: (err: any) => console.log(err),
    },
    publicPath: config.output.publicPath,
  });

  await new Promise(resolve => {
    fs.access(paths.resolveAppPath('.act-now.js'), (err: unknown) => {
      if (!err) {
        const actconfig = require(paths.resolveAppPath('.act-now'));

        for (let key in actconfig.proxys) {
          const middleware = createProxyMiddleware(key, Object.assign(actconfig.proxys[key], {}));

          app.use(c2k(middleware));
        }
      }

      resolve(err);
    });
  });

  app.use(router.routes(), router.allowedMethods());
  app.use(koaDevMiddleware(instance));
  app.use(koaHotMiddleware(hotCompiler));

  https.createServer(keyOpts, app.callback()).listen(8002);
  http.createServer(app.callback()).listen(8001);
}
