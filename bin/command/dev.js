"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = require("../server/webpack-dev-server");
const createConfig_1 = require("./createConfig");
const paths = require("../paths");
exports.default = (next) => (program) => {
    const dev = async (entryPath) => {
        process.env.NODE_ENV = 'development';
        if (!await paths.isFileExists('.act-now.js'))
            await createConfig_1.default();
        await webpack_dev_server_1.default({
            entryPath,
            env: 'development',
        });
    };
    program
        .command('dev [project]')
        .description('Development mode - Develop project; 开发模式-启动项目')
        .action(dev);
    next(program);
};
//# sourceMappingURL=dev.js.map