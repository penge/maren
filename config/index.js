const path = require('path');
const fse = require('fs-extra');

let jsons = {};

const load = location => {
  if (!jsons[location]) {
    jsons[location] = fse.readJsonSync(location, { throws: false }) || {};
  }

  return jsons[location];
};

const marenJson = cwd => load(path.join(cwd, 'maren.json'));
const optionsJson = cwd => load(path.join(cwd, 'options.json'));

module.exports = {
  marenJson,
  optionsJson
};
