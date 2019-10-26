const chokidar = require('chokidar');

const watchOptions = {
  awaitWriteFinish: {
    stabilityThreshold: 500
  },
};

module.exports = pathsToWatch => {
  return chokidar.watch(pathsToWatch, watchOptions);
};
