"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = require("../server/webpack-dev-server");
exports.default = (next) => (program) => {
    program
        .command('start [project]')
        .description('Development Mode - Start project; 开发模式-启动项目')
        .action((entryPath) => webpack_dev_server_1.default({
        entryPath,
        env: 'development',
    }));
    next(program);
};
//# sourceMappingURL=start.js.map