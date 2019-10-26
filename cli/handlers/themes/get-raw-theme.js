const path = require('path');
const { loadTheme, basicTheme } = require('maren-core');

module.exports = (cwd, themeName) => {
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
