module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config);
    // inclua outros códigos de configuração ou plugins
    return config;
  };
  