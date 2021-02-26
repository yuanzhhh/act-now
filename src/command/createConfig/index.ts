const fs = require('fs');

const defaultConfig = require('../../server/default.config');
import qa from './qa';
import * as paths from '../../paths';
import * as log from '../../log';

export default async () => {
  const { unit, browserOpen } = await new Promise(qa);

  const defineConfig = {
    ...defaultConfig,
    environment: {
      "px-to": unit,
    },
    browserOpen,
  };

  const createConfigPath = paths.resolveAppPath('.act-now.js');

  return await new Promise((resolve, reject) =>
    fs.writeFile(createConfigPath, `module.exports = ${JSON.stringify(defineConfig, null, "\t")}`, async (err: any) => {
      if (err) reject(err);

      log.success(`Create file seccess ${createConfigPath}`);

      resolve(true);
    }));
};
