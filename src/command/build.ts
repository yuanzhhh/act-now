import { UnknownFun } from 'onions';
import { Command } from 'commander';

import devServer from '../server/webpack-dev-server';

export default (next: UnknownFun) => (program: Command) => {
  program
    .command('build [project]')
    .description('Production mode - Build project; 生产文件输出')
    .action((entryPath?: string) =>
      devServer({
        entryPath,
        env: 'production',
      }));

  next(program);
};
