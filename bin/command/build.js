"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require('webpack');
const webpack_config_1 = require("../server/webpack.config");
const paths = require("../paths");
const log = require("../log");
const build = async (entryPath) => {
    process.env.NODE_ENV = 'production';
    const env = process.env.NODE_ENV;
    const actConfig = await paths.actConfig();
    const config = await webpack_config_1.default({ env, entryPath, actConfig });
    new Promise((resolve, reject) => webpack(config).run((err, stats) => {
        if (err)
            return reject(err);
        return resolve(stats);
    })).then(() => {
        log.success('Compiler success!');
        process.exit();
    }, () => {
        log.error('Unreliable results because compiler errors!');
        process.exit(1);
    });
};
exports.default = (next) => (program) => {
    program
        .command('build [project]')
        .description('Production mode - Build project; 生产文件输出')
        .action(build);
    next(program);
};
//# sourceMappingURL=build.js.map