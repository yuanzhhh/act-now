"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actConfig = exports.appIndex = exports.appPackage = exports.isFileExists = exports.resolveAppPath = exports.appPath = void 0;
const fs = require('fs');
const path = require('path');
const defaultConfig = require('./server/default.config');
exports.appPath = fs.realpathSync(process.cwd());
const resolveAppPath = (resolveName) => path.resolve(exports.appPath, resolveName);
exports.resolveAppPath = resolveAppPath;
const isFileExists = (url) => new Promise((resolve) => fs.access(exports.resolveAppPath(url), (err) => err ? resolve(false) : resolve(true)));
exports.isFileExists = isFileExists;
exports.appPackage = require(exports.resolveAppPath('package.json'));
exports.appIndex = exports.resolveAppPath(exports.appPackage.main);
const actConfig = async () => ({
    ...defaultConfig,
    ...(await exports.isFileExists('.act-now.js') && require(exports.resolveAppPath('.act-now')) || {})
});
exports.actConfig = actConfig;
//# sourceMappingURL=paths.js.map