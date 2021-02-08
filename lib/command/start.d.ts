import { UnknownFun } from 'onions';
import { Command } from 'commander';
declare const start: (next: UnknownFun) => (program: Command) => void;
export default start;
