"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAppPath = void 0;
const fs = require('fs');
const path = require('path');
const appPath = fs.realpathSync(process.cwd());
const resolveAppPath = (resolveName) => path.resolve(appPath, resolveName);
exports.resolveAppPath = resolveAppPath;
const appPackage = require(exports.resolveAppPath('package.json'));
const appIndex = exports.resolveAppPath(appPackage.main);
exports.default = ({
    appPackage,
    appIndex
});
//# sourceMappingURL=paths.js.map