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
const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa-connect');
const path = require('path');
const webpack_config_1 = require("./webpack.config");
const paths = require("../paths");
const keyOpts = {
    key: fs.readFileSync(path.resolve(__dirname, '../../src/server/privatekey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../src/server/certificate.pem')),
};
function koaDevMiddleware(devMiddleware) {
    return async function newDevMiddleware(ctx, next) {
        const err = await new Promise((resolve) => {
            devMiddleware(ctx.req, {
                end: (content) => {
                    ctx.body = content;
                    resolve(false);
                },
                setHeader: (name, value) => ctx.set(name, value),
            }, () => resolve(true));
        });
        if (err)
            return next();
        return null;
    };
}
;
function koaHotMiddleware(hotMiddleware) {
    return async (ctx, next) => next(await new Promise((resolve) => hotMiddleware(ctx.req, ctx.res, resolve)));
}
;
;
exports.default = async ({ env, entryPath }) => {
    const app = new Koa();
    const router = new Router();
    const config = await webpack_config_1.default({ env, entryPath });
    const compiler = webpack(config);
    const hotCompiler = hotMid(compiler);
    const instance = middleware(compiler, {
        quiet: true,
        noInfo: true,
        logger: {
            info: () => { },
            warn: (warn) => console.log(warn),
            error: (err) => console.log(err),
        },
        publicPath: config.output.publicPath,
    });
    if (await paths.isFileExists('.act-now.js')) {
        const actconfig = require(paths.resolveAppPath('.act-now'));
        for (let key in actconfig.proxys) {
            const middleware = createProxyMiddleware(key, Object.assign(actconfig.proxys[key], {}));
            app.use(c2k(middleware));
        }
    }
    ;
    app.use(router.routes(), router.allowedMethods());
    app.use(koaDevMiddleware(instance));
    app.use(koaHotMiddleware(hotCompiler));
    https.createServer(keyOpts, app.callback()).listen(8002);
    http.createServer(app.callback()).listen(8001);
};
//# sourceMappingURL=webpack-dev-server.js.map