import { Command } from 'commander';

import dev from './dev';
import build from './build';
import { MiddlewareFun } from 'onions';

export const register = (program: Command) => {
  program
};

export default [
  dev,
  build,
] as MiddlewareFun[];
