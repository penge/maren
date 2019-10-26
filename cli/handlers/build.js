const getRawTheme = require('./themes/get-raw-theme');
const { render } = require('maren-core');
const { build } = require('maren-build');

module.exports = async argv => {
  const { cwd, theme: themeName } = argv;

  const rawTheme = getRawTheme(cwd, themeName);
  await build(cwd, rawTheme, render);

  console.log('Finished!');
};
