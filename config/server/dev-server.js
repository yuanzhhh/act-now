const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const hotMid = require("webpack-hot-middleware");
const Router = require('@koa/router');

const webpackConfig = require('../webpack/webpack.config');
const { SERVER } = require('../infoConf');

const router = new Router();
const compiler = webpack(webpackConfig);

const keyOpts = {
    key: fs.readFileSync(path.resolve(__dirname, './privatekey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './certificate.pem')),
};

const instance = middleware(compiler, {
    quiet: true,
    noInfo: true,
    logger: {
        info: () => {},
        error: () => {},
    },
    publicPath: webpackConfig.output.publicPath,
});

const hotCompiler = hotMid(compiler);

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

        if (err) return next();

        return null;
    };
};

function koaHotMiddleware(hotMiddleware) {
    return async (ctx, next) =>
        next(await new Promise((resolve) => hotMiddleware(ctx.req, ctx.res, resolve)));
};

module.exports = (options) => {
    const { entry } = options;

    webpackConfig.entry.index[2] = entry;

    const app = new Koa();

    app.use(router.routes(), router.allowedMethods());
    app.use(koaDevMiddleware(instance));
    app.use(koaHotMiddleware(hotCompiler));

    https.createServer(keyOpts, app.callback()).listen(SERVER.https);
    http.createServer(app.callback()).listen(SERVER.http);
};
