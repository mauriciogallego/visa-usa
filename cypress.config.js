const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  video: false,
  defaultCommandTimeout: 20000,
  responseTimeout: 20000,
  waitForAnimations: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
