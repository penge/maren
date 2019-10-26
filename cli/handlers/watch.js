const fse = require('fs-extra');

const getRawTheme = require('./themes/get-raw-theme');
const { render } = require('maren-core');
const { build, buildFile, buildFilePath } = require('maren-build');
const watcherFactory = require('./watcher');

/**
 * Watch *.md and produce *.html
 */
module.exports = async argv => {
  const { cwd, theme: themeName } = argv;

  const rawTheme = getRawTheme(cwd, themeName);
  const {
    theme,
    pathsToWatch
  } = await build(cwd, rawTheme, render);

  const watcher = watcherFactory(pathsToWatch);
  console.log(`Watching ${cwd}, theme=${themeName}`);

  watcher.on('all', async (event, mdPath) => {
    const outputPath = buildFilePath(cwd, mdPath);

    if (event === 'add' || event === 'change') {
      await buildFile(mdPath, outputPath, theme, render);
      console.log('OUT %s', outputPath);
    }

    if (event === 'unlink') {
      await fse.remove(outputPath);
      console.log('DEL %s', outputPath);
    }
  });
};
