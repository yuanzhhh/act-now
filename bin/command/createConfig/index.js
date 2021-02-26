"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const defaultConfig = require('../../server/default.config');
const qa_1 = require("./qa");
const paths = require("../../paths");
const log = require("../../log");
exports.default = async () => {
    const { unit, browserOpen } = await new Promise(qa_1.default);
    const defineConfig = {
        ...defaultConfig,
        environment: {
            "px-to": unit,
        },
        browserOpen,
    };
    const createConfigPath = paths.resolveAppPath('.act-now.js');
    return await new Promise((resolve, reject) => fs.writeFile(createConfigPath, `module.exports = ${JSON.stringify(defineConfig, null, "\t")}`, async (err) => {
        if (err)
            reject(err);
        log.success(`Create file seccess ${createConfigPath}`);
        resolve(true);
    }));
};
//# sourceMappingURL=index.js.map