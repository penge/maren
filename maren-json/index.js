const fs = require('fs');
const path = require('path');

let marenJson;

module.exports = cwd => {
  if (!marenJson) {
    try {
      const raw = fs.readFileSync(path.join(cwd, 'maren.json'));
      marenJson = JSON.parse(raw);
    } catch (e) {
      marenJson = {}; // maren.json is not necessary
    }
  }

  return marenJson;
};
