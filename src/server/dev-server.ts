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

import webpackConfig from './webpack.config';
import * as paths from '../paths';

const proxys = require(paths.resolveAppPath('proxys'));

const keyOpts = {
  key: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/privatekey.pem'),
  cert: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/certificate.pem'),
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
  env: 'development' | 'production'
};

export default ({ env }: ServerOptions) => {
  const app = new Koa();
  const router = new Router();

  const config = webpackConfig({ env });
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

  for (let key in proxys.proxys) {
    const middleware = createProxyMiddleware(key, Object.assign(proxys.proxys[key], {}));

    app.use(c2k(middleware));
  }

  app.use(router.routes(), router.allowedMethods());
  app.use(koaDevMiddleware(instance));
  app.use(koaHotMiddleware(hotCompiler));

  https.createServer(keyOpts, app.callback()).listen(8002);
  http.createServer(app.callback()).listen(8001);
}
