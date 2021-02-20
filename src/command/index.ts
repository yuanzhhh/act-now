import { Command } from 'commander';

import start from './start';
import { MiddlewareFun } from 'onions';

export const register = (program: Command) => {
  program
};

export default [
  start,
] as MiddlewareFun[];
