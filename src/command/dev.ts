import { UnknownFun } from 'onions';
import { Command } from 'commander';

import devServer from '../server/webpack-dev-server';

export default (next: UnknownFun) => (program: Command) => {
  const dev = async (entryPath?: string) => {
    process.env.NODE_ENV = 'development';

    await devServer({
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
