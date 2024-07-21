import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  fixturesFolder: false,

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:9009',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
