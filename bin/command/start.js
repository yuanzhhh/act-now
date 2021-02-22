"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = require("../server/webpack-dev-server");
exports.default = (next) => (program) => {
    const dev = (entryPath) => {
        process.env.NODE_ENV = 'development';
        webpack_dev_server_1.default({
            entryPath,
            env: 'development',
        });
    };
    program
        .command('start [project]')
        .description('Development mode - Start project; 开发模式-启动项目')
        .action(dev);
    next(program);
};
//# sourceMappingURL=start.js.map