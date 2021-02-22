"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = require("../server/webpack-dev-server");
exports.default = (next) => (program) => {
    program
        .command('build [project]')
        .description('Production mode - Build project; 生产文件输出')
        .action((entryPath) => webpack_dev_server_1.default({
        entryPath,
        env: 'production',
    }));
    next(program);
};
//# sourceMappingURL=build.js.map