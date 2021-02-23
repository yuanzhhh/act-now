const fs = require('fs');
const path = require('path');

const defaultConfig = require('./server/default.config');

export const appPath = fs.realpathSync(process.cwd());
export const resolveAppPath = (resolveName: string) =>
  path.resolve(appPath, resolveName);
export const isFileExists = (url: string) =>
  new Promise((resolve) =>
    fs.access(resolveAppPath(url), (err: unknown) =>
      err ? resolve(false) : resolve(true)));

export const appPackage = require(resolveAppPath('package.json'));
export const appIndex = resolveAppPath(appPackage.main);
export const actConfig = async () => ({
  ...defaultConfig,
  ...(
    await isFileExists('.act-now.js') && require(resolveAppPath('.act-now')) || {}
  )
});
