const path = require('path');
const fse = require('fs-extra');
const md5File = require('md5-file');

const hashAssets = (cwd, themeName, themeLocation, assets) => {
  if (!Array.isArray(assets)) {
    return;
  }

  return assets.map(src => {
    if (src.includes('//')) {
      return src;
    }

    try {
      const name = path.basename(src).split('.')[0];
      const hash = md5File.sync(path.join(themeLocation, src));
      const ext = path.extname(src);

      const outFile = `${name}-${hash}${ext}`;
      fse.copy(
        path.join(cwd, 'themes', themeName, src),
        path.join(cwd, '_build', 'themes', themeName, outFile));

      return `/themes/${themeName}/${outFile}`;
    } catch (e) {}
  });
};

const reinit = async (cwd, theme) => {
  await fse.emptyDir(`${cwd}/_build`);

  try {
    await fse.copy(
      `${cwd}/static`,
      `${cwd}/_build/static`);
  } catch (e) {}

  let { name, location, template, options } = theme;

  // if options is not defined, return theme as is
  if (!options) {
    return theme;
  }

  let { styles, scripts } = options;
  styles = hashAssets(cwd, name, location, styles);
  scripts = hashAssets(cwd, name, location, scripts);
  options = { styles, scripts };

  return {
    template,
    options
  };
};

const buildPath = (cwd, mdPath) => {
  const root = path.relative(cwd, mdPath);
  const replaced = root.replace(/^documents/,'_build').replace('.md', '.html');
  return path.resolve(replaced);
};

module.exports = {
  reinit,
  buildPath
};
