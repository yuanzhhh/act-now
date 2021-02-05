import { program } from 'commander';
import onions, { MiddlewareFun } from 'onions';

import command from './command/index';

(async () => {
  let beforeMiddleware = [...(command as MiddlewareFun[])];

  const ready = onions(() => {
    console.log('Done!');
  }, beforeMiddleware, []);

  await ready(program);

  program.parse(process.argv);
})();
