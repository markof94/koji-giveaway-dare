module.exports = function override(config, env) {
  // Allow us to import koji.json from outside the project's root
  // eslint-disable-next-line no-param-reassign
  config.resolve.plugins = config.resolve.plugins
    .filter((plugin) => plugin.constructor.name !== 'ModuleScopePlugin');

  // Alias src directory so we can import by absolute paths
  config.resolve.modules.push('src');

  // Return the updated config
  return config;
};
