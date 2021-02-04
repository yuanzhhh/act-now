const start = (next) => (program) => {
    program
        .command('start [service]')
        .description('Development Mode - Start project; 开发模式-启动项目')
        .action(() => {
            console.log('ready');
        });

    next(program);
};

module.exports = start;
