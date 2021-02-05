import { program } from 'commander';
import onions from 'onions';

import command from './command/index';

(async () => {
  const commands = [...command];

  const ready = onions(commands);

  await ready(program);

  program.parse(process.argv);
})();
