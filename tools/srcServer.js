// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigBuilder from '../webpack.config';

const webpackConfig = webpackConfigBuilder('development');
const bundler = webpack(webpackConfig);

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001,
  },
  server: {
    baseDir: 'src',

    middleware: [
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true,

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

    ],
  },

  files: [
    'src/*.html',
  ],
});
