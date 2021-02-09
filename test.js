const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const Router = require('@koa/router');

const keyOpts = {
    key: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/privatekey.pem'),
    cert: fs.readFileSync('/Users/jryuanentai/work/jtalk/laboratory/act-now/src/server/certificate.pem'),
};

module.exports = () => {
    const app = new Koa();
    const router = new Router();

    router.get('/', async (ctx, next) => {
        console.log('@@@@@')

        next();
    });

    app.use(router.routes(), router.allowedMethods());

    https.createServer(keyOpts, app.callback()).listen(8002);
    http.createServer(app.callback()).listen(8001);
}
