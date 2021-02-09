const fs = require('fs');
const path = require('path');

const appPath = fs.realpathSync(process.cwd());
export const resolveAppPath = (resolveName: string) =>
  path.resolve(appPath, resolveName);

const appPackage = require(resolveAppPath('package.json'));
const appIndex = resolveAppPath(appPackage.main);

export default ({
  appPackage,
  appIndex
});
