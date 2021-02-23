"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require('webpack');
const chalk = require('chalk');
const webpack_config_1 = require("../server/webpack.config");
const paths = require("../paths");
const build = async (entryPath) => {
    process.env.NODE_ENV = 'production';
    const log = console.log;
    const env = process.env.NODE_ENV;
    let actConfig = await paths.actConfig();
    const config = await webpack_config_1.default({ env, entryPath, actConfig });
    const compiler = webpack(config);
    new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err)
                return reject(err);
            return resolve(stats);
        });
    }).then(() => {
        log(chalk.bold.green('Compiler success!'));
        process.exit();
    }, () => {
        log(chalk.bold.bgRed('Unreliable results because compiler errors!'));
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