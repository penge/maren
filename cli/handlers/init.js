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
 * Initialize <cwd> by creating .gitignore
 */
module.exports = async argv => {
  const { cwd } = argv;

  console.log(`Initialize: ${cwd}`);

  const gitignorePath = path.join(cwd, '.gitignore');
  await fse.writeFile(gitignorePath, gitignoreContent);

  console.log('Done!');
};
