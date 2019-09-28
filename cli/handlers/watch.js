const path = require('path');
const fse = require('fs-extra');
const chokidar = require('chokidar');

const themes = require('../../themes');
const build = require('../../build');
const render = require('../../markdown/render');

let count = 0;

/**
 * Watch *.md and produce *.html
 */
module.exports = async argv => {
  const { cwd, theme: themeName, once } = argv;
  const persistent = once ? false : true;

  let theme = themes(cwd, themeName);
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
      await fse.remove(path);
      console.log('DEL %s', outputPath);
    }
  });

  process.on('exit', code => {
    if (!persistent) {
      console.log();
      console.log(`Finished! (${count} files)`);
    }
  });
};
