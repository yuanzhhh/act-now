import { UnknownFun } from 'onions';
import { Command } from 'commander';

import devServer from '../server/dev-server';

// const devServer = require('../server/dev-server');

const start = (next: UnknownFun) => (program: Command) => {
  program
    .command('start <project>')
    .description('Development Mode - Start project; 开发模式-启动项目')
    .action((_project) => {
      // const cwd = process.cwd();

      devServer({
        env: 'development',
      });
    });

  next(program);
};

export default start;
