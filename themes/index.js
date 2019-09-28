const path = require('path');
const optionsJson = require('../config').optionsJson;

module.exports = (cwd, themeName) => {
  let location;
  let template;

  try {
    location = path.join(cwd, 'themes', themeName);
    template = require(`${location}/template.js`);
  } catch (e) {
    console.log(`Unknown theme: ${themeName}`);
    process.exit(1);
  }

  const name = themeName;
  const options = optionsJson(location);

  const theme = {
    name,
    location,
    template,
    options
  };

  return theme;
};
