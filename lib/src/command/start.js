"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack_1 = require("webpack");
console.log(webpack_1.default, '@@@');
const creatApp = require('../../config/server/creatApp');
const start = (next) => (program) => {
    program
        .option('-o, --output', 'Build output path')
        .command('start <project>')
        .description('Development Mode - Start project; 开发模式-启动项目')
        .action((project) => {
        const cwd = process.cwd();
        const entry = path.resolve(cwd, project);
        creatApp(entry);
    });
    next(program);
};
exports.default = start;
//# sourceMappingURL=start.js.map