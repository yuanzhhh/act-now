"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appIndex = exports.appPackage = exports.resolveAppPath = exports.appPath = void 0;
const fs = require('fs');
const path = require('path');
exports.appPath = fs.realpathSync(process.cwd());
const resolveAppPath = (resolveName) => path.resolve(exports.appPath, resolveName);
exports.resolveAppPath = resolveAppPath;
exports.appPackage = require(exports.resolveAppPath('package.json'));
exports.appIndex = exports.resolveAppPath(exports.appPackage.main);
//# sourceMappingURL=paths.js.map