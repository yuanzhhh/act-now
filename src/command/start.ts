import * as path from 'path';
import { UnknownFun } from 'onions';
import { Command } from 'commander';

const start = (next: UnknownFun) => (program: Command) => {
  program
    .command('start <project>')
    .description('Development Mode - Start project; 开发模式-启动项目')
    .action((project) => {
      console.log(path.resolve(process.cwd(), project))
    });

  next(program);
};

export default start;
