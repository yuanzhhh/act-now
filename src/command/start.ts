import * as path from 'path'

const start = (next) => (program) => {
  program
    .command('start <project>')
    .description('Development Mode - Start project; 开发模式-启动项目')
    .action((project) => {
      const entry = path.resolve(process.cwd(), project);
    });

  next(program);
};

export default start;
