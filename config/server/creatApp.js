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

const app = new Koa();
const router = new Router();

const keyOpts = {
    key: fs.readFileSync(path.resolve(__dirname, './privatekey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './certificate.pem')),
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

        if (err) return next();

        return null;
    };
};

function koaHotMiddleware(hotMiddleware) {
    return async (ctx, next) =>
        next(await new Promise((resolve) => hotMiddleware(ctx.req, ctx.res, resolve)));
};

module.exports = (config) => {
    const compiler = webpack(config, (err) => {
        app.use(koaDevMiddleware(instance));
        app.use(koaHotMiddleware(hotCompiler));
    });

    const instance = middleware(compiler, {
        quiet: true,
        noInfo: true,
        logger: {
            info: () => {},
            error: () => {},
        },
        publicPath: config.output.publicPath,
    });

    const hotCompiler = hotMid(compiler);


    app.use(router.routes(), router.allowedMethods());

    https.createServer(keyOpts, app.callback()).listen(SERVER.https);
    http.createServer(app.callback()).listen(SERVER.http);
};
