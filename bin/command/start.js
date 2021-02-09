"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_server_1 = require("../server/dev-server");
// const devServer = require('../server/dev-server');
const start = (next) => (program) => {
    program
        .command('start <project>')
        .description('Development Mode - Start project; 开发模式-启动项目')
        .action((_project) => {
        // const cwd = process.cwd();
        dev_server_1.default({
            env: 'development',
        });
    });
    next(program);
};
exports.default = start;
//# sourceMappingURL=start.js.map