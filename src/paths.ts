const fs = require('fs');
const path = require('path');

export const appPath = fs.realpathSync(process.cwd());
export const resolveAppPath = (resolveName: string) =>
  path.resolve(appPath, resolveName);

export const appPackage = require(resolveAppPath('package.json'));
export const appIndex = resolveAppPath(appPackage.main);
