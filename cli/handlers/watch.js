const path = require('path');
const fse = require('fs-extra');
const chokidar = require('chokidar');

const build = require('../../build');
const { render, loadTheme, basicTheme } = require('maren-core');

let count = 0;

const getTheme = (cwd, themeName) => {
  // Return basicTheme if:
  // a) maren.json does not exist
  // b) maren.json has theme but set to empty string
  if (!themeName) {
    return basicTheme;
  }

  const themeLocation = path.join(cwd, 'themes', themeName);
  const theme = loadTheme(themeLocation);
  if (!theme) {
    console.log(`Unknown theme: ${themeName}`);
    process.exit(1);
  }

  return theme;
};

/**
 * Watch *.md and produce *.html
 */
module.exports = async argv => {
  const { cwd, theme: themeName, once } = argv;
  const persistent = once ? false : true;

  let theme = getTheme(cwd, themeName);
  theme = await build.reinit(cwd, theme);

  const paths = [
    path.join(cwd, 'documents', '**/*.md'),
    path.join(cwd, 'draft', '**/*.md')
  ];

  const watchOptions = {
    awaitWriteFinish: {
      stabilityThreshold: 500
    },
  };

  const watcher = chokidar.watch(paths, { ...watchOptions, persistent });
  console.log(`Watching ${cwd}, theme=${themeName}`);

  watcher.on('all', async (event, mdPath) => {
    const outputPath = build.buildPath(cwd, mdPath);

    if (event === 'add' || event === 'change') {
      const markdown = await fse.readFile(mdPath, 'utf-8');
      const output = render(markdown, theme);
      await fse.outputFile(outputPath, output);
      count += 1;
      console.log('OUT %s', outputPath);
    }

    if (event === 'unlink') {
      await fse.remove(outputPath);
      console.log('DEL %s', outputPath);
    }
  });

  process.on('exit', () => {
    if (!persistent) {
      console.log();
      console.log(`Finished! (${count} files)`);
    }
  });
};
