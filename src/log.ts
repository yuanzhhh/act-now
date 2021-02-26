const logSymbols = require('log-symbols');
const chalk = require('chalk');

const log = console.log;

export const success = (content: string) =>
  log(logSymbols.success, chalk.bold.green(content));

export const info = (content: string) =>
  log(logSymbols.info, chalk.bold.blue(content));

export const warn = (content: string) =>
  log(logSymbols.warning, chalk.bold.yellow(content));

export const error = (content: string) =>
  log(logSymbols.error, chalk.bold.red(content));
