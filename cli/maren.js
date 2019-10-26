#!/usr/bin/env node

const cwd = process.cwd();
const marenJson = require('../maren-json')(cwd);

const plugins = require('../plugins')(cwd, marenJson, 'command');
const yargs = require('yargs').scriptName('maren');

// Handlers
const init = require('./handlers/init');
const build = require('./handlers/build');
const watch = require('./handlers/watch');
const serve = require('./handlers/serve');

const initCommand = [
  'init',
  'init current folder',
  {},
  init
];

const buildCommand = [
  'build',
  'build blog to _build directory',
  {},
  build
];

const watchCommand = [
  'watch',
  'watch markdown files for changes and create html',
  {},
  watch
];

const serveCommand = [
  'serve [--port]',
  'serve files for local preview',
  yargs => {
    yargs.positional('port', {
      type: 'number',
      default: 8080
    });
  },
  serve
];

yargs
  .command(...initCommand)
  .command(...buildCommand)
  .command(...watchCommand)
  .command(...serveCommand);

for (const plugin of plugins) {
  yargs.command(...plugin.command);
}

yargs
  .demandCommand(1, 1, 'Command is required!')
  .config({ cwd, theme: marenJson.theme })
  .help()
  .argv;
