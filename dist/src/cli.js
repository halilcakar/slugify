#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = cli;

var _chalk = _interopRequireDefault(require("chalk"));

var _figlet = _interopRequireDefault(require("figlet"));

var _path = _interopRequireDefault(require("path"));

var _commander = require("commander");

var _package = require("../package.json");

var _files = _interopRequireDefault(require("./lib/files"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getName = () => {
  return `${_package.name.split('/')[1]}-cli`;
};

async function cli(argv) {
  console.log(_chalk.default.yellow(_figlet.default.textSync(getName(), {
    horizontalLayout: 'full'
  })));

  _commander.program.option('-t, --target <path>', 'Target directory', '').option('-d, --destination <path>', 'Destination directory').option('--debug', 'Should console path\'s?').version(_package.version);

  _commander.program.parse(argv);

  let {
    target,
    destination,
    debug
  } = _commander.program.opts();

  if (target === '' && _commander.program.args.length === 0) {
    return _commander.program.help();
  }

  if (_commander.program.args.length) {
    target = _commander.program.args[0];
  }

  target = _path.default.resolve(`./${target}`);

  if (!destination) {
    destination = _path.default.resolve(`${target}-fix`);
  } else {
    destination = _path.default.resolve(`${destination}`);
  }

  try {
    await _files.default.process({
      target,
      destination,
      debug
    });
  } catch (error) {
    console.log(error);
    console.error(_chalk.default.red('\nUpss.. Something went wrong. Please check your files :)\n'));
    process.exit(1);
  }

  console.log(_chalk.default.green('\nFile/s copied.'));
}