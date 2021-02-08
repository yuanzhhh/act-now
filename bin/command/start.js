"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require('cross-spawn');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const webpack = require('webpack');
// const devServer = require('../../config/server/dev-server');
// const dllConf = require('../../config/');
const start = (next) => (program) => {
    program
        .option('-o, --output', 'Build output path')
        .command('start <project>')
        .description('Development Mode - Start project; 开发模式-启动项目')
        .action((_project) => {
        // const cwd = process.cwd();
        // const entry = path.resolve(cwd, project);
        // const outPath = path.resolve(cwd, 'dist');
        // const outDllPath = path.resolve(cwd, 'dll');
        // const packagePath = path.resolve(cwd, 'package.json');
        // const projectPackage = require(packagePath);
        spawn.sync('webpack', ['--config', 'config/webpack/webpack.dll.conf.js'], { stdio: 'inherit' });
        // devServer({
        //   entry,
        //   outPath
        // });
    });
    next(program);
};
exports.default = start;
//# sourceMappingURL=start.js.map