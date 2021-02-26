import { UnknownFun } from 'onions';
import { Command } from 'commander';
const webpack = require('webpack');

import webpackConfig from '../server/webpack.config';
import * as paths from '../paths';
import * as log from '../log';

const build = async (entryPath?: string) => {
  process.env.NODE_ENV = 'production';
  const env = process.env.NODE_ENV as 'production';

  let actConfig = await paths.actConfig();
  const config = await webpackConfig({ env, entryPath, actConfig });
  const compiler = webpack(config);

  new Promise((resolve, reject) =>
    compiler.run((err: unknown, stats: unknown) => {
      if (err) return reject(err);

      return resolve(stats);
    })).then(() => {
      log.success('Compiler success!');

      process.exit();
    }, () => {
      log.error('Unreliable results because compiler errors!');

      process.exit(1);
    });
};

export default (next: UnknownFun) => (program: Command) => {
  program
    .command('build [project]')
    .description('Production mode - Build project; 生产文件输出')
    .action(build);

  next(program);
};
