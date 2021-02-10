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
const webpack_config_1 = require("./webpack.config");
const paths = require("../paths");
const proxys = require(paths.resolveAppPath('proxys'));
const keyOpts = {
    key: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/privatekey.pem'),
    cert: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/certificate.pem'),
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
exports.default = ({ env, entryPath }) => {
    const app = new Koa();
    const router = new Router();
    const config = webpack_config_1.default({ env, entryPath });
    const compiler = webpack(config);
    const hotCompiler = hotMid(compiler);
    const instance = middleware(compiler, {
        quiet: true,
        noInfo: true,
        logger: {
            info: () => { },
            error: (err) => console.log(err),
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
};
//# sourceMappingURL=dev-server.js.map