const fs = require('fs');
const path = require('path');

const plugins = {};

const pluginDirs = ['core', 'fun'];
pluginDirs.forEach(dir => {
  fs.readdirSync(`./plugins/${dir}`).forEach(file => {
    if (file.endsWith('.js')) {
      const plugin = require(`../plugins/${dir}/${file}`);
      plugins[plugin.command] = plugin;
      console.log(`✅ Loaded: ${plugin.name}`);
    }
  });
});

module.exports = plugins
