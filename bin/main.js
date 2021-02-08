"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const onions_1 = require("onions");
const index_1 = require("./command/index");
(async () => {
    const commands = [...index_1.default];
    const ready = onions_1.default(commands);
    await ready(commander_1.program);
})();
commander_1.program.parse(process.argv);
//# sourceMappingURL=main.js.map