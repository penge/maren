const path = require('path');
const fse = require('fs-extra');

const gitignoreContent = [
  'node_modules/',
  '_build/',
  'draft/',
  'static/',
  'themes/',
  ''
].join('\n');

/**
 * Initialize <cwd> by creating:
 *
 * .gitignore
 * documents
 * draft
 * static
 * themes
 */
module.exports = async argv => {
  const { cwd } = argv;

  console.log(`Initialize: ${cwd}`);

  const gitignorePath = path.join(cwd, '.gitignore');
  await fse.writeFile(gitignorePath, gitignoreContent);

  await fse.ensureDir(path.join(cwd, 'documents'));
  await fse.ensureDir(path.join(cwd, 'draft'));
  await fse.ensureDir(path.join(cwd, 'static'));
  await fse.ensureDir(path.join(cwd, 'themes'));

  console.log('Done!');
};
