const path = require('path');

let loadedPlugins;

/**
 * Load plugins (all, or by type like "command")
 */
module.exports = (cwd, marenJson, type) => {
  if (!Array.isArray(marenJson && marenJson['plugins'])) {
    return [];
  }

  if (!loadedPlugins) {
    loadedPlugins = marenJson['plugins'].map(pluginName => {
      try {
        const pluginLocation = path.join(cwd, 'node_modules', pluginName);
        const plugin = require(pluginLocation);
        return plugin;
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.log(`Unknown plugin: ${pluginName}`);
          process.exit(1);
        }
        throw err;
      }
    });
  }

  const plugins = type
    ? loadedPlugins.filter(plugin => plugin.type === type)
    : loadedPlugins;

  return plugins;
};
