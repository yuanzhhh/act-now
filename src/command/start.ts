import { UnknownFun } from 'onions';
import { Command } from 'commander';

import devServer from '../server/webpack-dev-server';

export default (next: UnknownFun) => (program: Command) => {
  program
    .command('start [project]')
    .description('Development Mode - Start project; 开发模式-启动项目')
    .action((entryPath?: string) =>
      devServer({
        entryPath,
        env: 'development',
      }));

  next(program);
};
