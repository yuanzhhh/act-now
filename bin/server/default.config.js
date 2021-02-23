"use strict";
// const RUN_TIME = 'local';
// const RUN_TIME = 'dev';
// const RUN_TIME = 'dev2';
// const RUN_TIME = 'test';
// const RUN_TIME = 'test2';
// const RUN_TIME = "online";
// const RUN_TIME_INFO = {
//     local: {
//         portalWebUrl: "10.222.8.60",
//         portalWebPort: "9090",
//         serviceWebUrl: "10.222.9.178",
//         serviceWebPort: "8083",
//         protocol: "http",
//     },
//     dev: {
//         portalWebUrl: "c-jtalk.jd.com",
//         portalWebPort: "80",
//         serviceWebUrl: "c-jtalk.jd.com",
//         serviceWebPort: "80",
//         protocol: "http",
//     },
//     dev2: {
//         portalWebUrl: "dev2.c-jtalk.jd.com",
//         portalWebPort: "80",
//         serviceWebUrl: "dev2.c-jtalk.jd.com",
//         serviceWebPort: "80",
//         protocol: "http",
//     },
//     test: {
//         portalWebUrl: "jtk.jd.com",
//         portalWebPort: "443",
//         serviceWebUrl: "jtk.jd.com",
//         serviceWebPort: "443",
//         protocol: "https",
//     },
//     test2: {
//         portalWebUrl: "m-jtalk2.jd.com",
//         portalWebPort: "443",
//         serviceWebUrl: "10.222.113.220",
//         serviceWebPort: "8083",
//         protocol: "https",
//     },
//     online: {
//         portalWebUrl: "jtk.jd.com",
//         portalWebPort: "443",
//         serviceWebUrl: "jtk.jd.com",
//         serviceWebPort: "443",
//         protocol: "https",
//     },
// }[RUN_TIME];
module.exports = {
    /**
     * 'Environment' is app build apply environment
     */
    environment: {
        // px-to 'vw' or 'rem' or 'px'
        // Default 'px', No conversion
        "px-to": 'px',
    },
    proxy: {
    // "/jtalk/message/**": {
    //     target: `${protocol}://${portalWebUrl}:${portalWebPort}`,
    //     changeOrigin: true,
    //     cookieDomainRewrite: {
    //         "*": "",
    //     },
    //     secure: false,
    // },
    // "/jtalk/service/**": {
    //     target: `${protocol}://${serviceWebUrl}:${serviceWebPort}`,
    //     changeOrigin: true,
    //     cookieDomainRewrite: {
    //         "*": "",
    //     },
    //     secure: false,
    // },
    // "/im/**": {
    //     target: `${protocol}://${serviceWebUrl}:${serviceWebPort}`,
    //     changeOrigin: true,
    //     cookieDomainRewrite: {
    //         "*": "",
    //     },
    //     secure: false,
    // },
    // "/jtalk/**": {
    //     target: `${protocol}://${portalWebUrl}:${portalWebPort}`,
    //     changeOrigin: true,
    //     cookieDomainRewrite: {
    //         "*": "",
    //     },
    //     secure: false,
    // },
    },
    protocol: {
        "http-port": 8001,
        "https-port": 8002,
    },
    env: {
    /**

     */
    },
};
//# sourceMappingURL=default.config.js.map