const path = require('path');
const fse = require('fs-extra');

/**
 * Initialize <cwd> by creating:
 *
 * .gitignore
 * documents
 * draft
 * static
 * themes
 * maren.json
 */
module.exports = async argv => {
  const { cwd } = argv;

  console.log(`Initialize: ${cwd}`);

  await fse.copy(
    path.join(__dirname, 'files', 'gitignore'),
    path.join(cwd, '.gitignore'));

  await fse.copy(
    path.join(__dirname, 'files', 'maren.json'),
    path.join(cwd, 'maren.json'));

  await fse.ensureDir(path.join(cwd, 'documents'));
  await fse.ensureDir(path.join(cwd, 'draft'));
  await fse.ensureDir(path.join(cwd, 'static'));
  await fse.ensureDir(path.join(cwd, 'themes'));

  console.log('Done!');
};
