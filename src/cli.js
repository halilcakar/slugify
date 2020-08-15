#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import path from 'path';
import { program } from 'commander';
import { version, name } from '../package.json';
import files from './lib/files';

export async function cli(argv) {
  console.log(
    chalk.yellow(
      figlet.textSync(getName(), { horizontalLayout: 'full' })
    )
  );

  program
    .option('-t, --target <path>', 'Target directory', '')
    .option('-d, --destination <path>', 'Destination directory')
    .option('--debug', 'Should console path\'s?')
    .version(version);
  program.parse(argv);

  let { target, destination, debug } = program.opts();

  if (target === '' && program.args.length === 0) {
    return program.help();
  }

  if (program.args.length) {
    target = program.args[0];
  }

  target = path.resolve(`./${target}`);
  if (!destination) {
    destination = path.resolve(`${target}-fix`);
  }
  else {
    destination = path.resolve(`${destination}`);
  }

  try {
    await files.process({ target, destination, debug });
  } catch (error) {
    console.error(
      chalk.red('\nUpss.. Something went wrong. Please check your files :)\n')
    );
    process.exit(1);
  }
  console.log(
    chalk.green(
      '\nFile/s copied.\n'
    )
  );
}

function getName() {
  return `${name.split('/')[1]}-cli`;
}