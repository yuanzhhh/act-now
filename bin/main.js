require("regenerator-runtime/runtime");
const { program } = require('commander');
const onions = require('onions');

const command = require('./command/index');

(async () => {
    const ready = onions(() => {
        console.log('Done!');
    }, [
        ...command,
    ], []);

    await ready(program);

    program.parse(process.argv);
})();
