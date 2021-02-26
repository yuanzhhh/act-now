"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.info = exports.success = void 0;
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const log = console.log;
const success = (content) => log(logSymbols.success, chalk.bold.green(content));
exports.success = success;
const info = (content) => log(logSymbols.info, chalk.bold.blue(content));
exports.info = info;
const warn = (content) => log(logSymbols.warning, chalk.bold.yellow(content));
exports.warn = warn;
const error = (content) => log(logSymbols.error, chalk.bold.red(content));
exports.error = error;
//# sourceMappingURL=log.js.map