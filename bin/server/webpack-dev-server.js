"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const open = require('open');
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpack_config_1 = require("./webpack.config");
const paths = require("../paths");
const log = console.log;
const keyOpts = {
    key: fs.readFileSync(path.resolve(__dirname, '../../src/server/privatekey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../src/server/certificate.pem')),
};
const koaDevMiddleware = (devMiddleware) => async (ctx, next) => await new Promise((resolve) => {
    devMiddleware(ctx.req, {
        end: (content) => {
            ctx.body = content;
            resolve(false);
        },
        setHeader: (name, value) => ctx.set(name, value),
    }, () => resolve(true));
}) ? next() : null;
const koaHotMiddleware = (hotMiddleware) => async (ctx, next) => next(await new Promise((resolve) => hotMiddleware(ctx.req, ctx.res, resolve)));
;
exports.default = async ({ env, entryPath }) => {
    const app = new Koa();
    const router = new Router();
    let actConfig = await paths.actConfig();
    const config = await webpack_config_1.default({ env, entryPath, actConfig });
    const compiler = webpack(config);
    const hotCompiler = hotMid(compiler);
    const instance = middleware(compiler, {
        quiet: true,
        noInfo: true,
        logger: {
            info: async () => {
                /**
                 * Webpack compiler done Callback, and log output
                 */
                if (actConfig.browserOpen)
                    await open(`https://localhost:${actConfig.protocol['https-port']}`);
                log(chalk.bold.white(`https://localhost:${actConfig.protocol['https-port']}`));
                log(chalk.bold.white(`https://localhost:${actConfig.protocol['http-port']}`));
            },
            warn: (warn) => log(chalk.bold.yellow(warn)),
            error: (err) => log(chalk.bold.red(err)),
        },
        publicPath: config.output.publicPath,
    });
    for (let key in actConfig.proxys)
        app.use(c2k(createProxyMiddleware(key, { ...actConfig.proxys[key] })));
    app.use(router.routes(), router.allowedMethods());
    app.use(koaDevMiddleware(instance));
    app.use(koaHotMiddleware(hotCompiler));
    https.createServer(keyOpts, app.callback()).listen(actConfig.protocol['https-port']);
    http.createServer(app.callback()).listen(actConfig.protocol['http-port']);
};
//# sourceMappingURL=webpack-dev-server.js.map