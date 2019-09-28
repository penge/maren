#!/usr/bin/env node

const cwd = process.cwd();
const marenJson = require('../config').marenJson(cwd);
const plugins = require('../plugins')(cwd, marenJson, 'command');
const yargs = require('yargs').scriptName('maren');
const theme = marenJson.theme || 'default';

// Handlers
const init = require('./handlers/init');
const watch = require('./handlers/watch');
const serve = require('./handlers/serve');

const initCommand = [
  'init',
  'init current folder',
  {},
  init
];

const watchCommand = [
  'watch [--once]',
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
  .command(...watchCommand)
  .command(...serveCommand);

for (const plugin of plugins) {
  yargs.command(...plugin.command);
}

yargs
  .demandCommand(1, 1, 'Command is required!')
  .config({ cwd, theme })
  .help()
  .argv;
