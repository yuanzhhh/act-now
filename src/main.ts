import 'regenerator-runtime/runtime';
import { program } from 'commander';
import onions from 'onions';

import command from './command/index';

(async () => {
    const beforeMiddleware = [...command];

    const ready = onions(() => {
        console.log('Done!');
    }, beforeMiddleware, []);

    await ready(program);

    program.parse(process.argv);
})();
