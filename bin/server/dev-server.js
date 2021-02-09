"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
// const path = require('path');
const hotMid = require("webpack-hot-middleware");
const Router = require('@koa/router');
const webpack_config_1 = require("./webpack.config");
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
exports.default = ({ env }) => {
    const app = new Koa();
    const router = new Router();
    const config = webpack_config_1.default({ env });
    webpack(config, (compiler) => {
        const hotCompiler = hotMid(compiler);
        const instance = middleware(compiler, {
            quiet: true,
            noInfo: true,
            logger: { info: () => { } },
            publicPath: config.output.publicPath,
        });
        app.use(koaDevMiddleware(instance));
        app.use(koaHotMiddleware(hotCompiler));
    });
    app.use(router.routes(), router.allowedMethods());
    https.createServer(keyOpts, app.callback()).listen(8002);
    http.createServer(app.callback()).listen(8001);
};
//# sourceMappingURL=dev-server.js.map