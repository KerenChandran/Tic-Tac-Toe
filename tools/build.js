// More info on Webpack's Node API here:
// https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfigBuilder from '../webpack.config';
import colors from 'colors';
import { argv as args } from 'yargs';

process.env.NODE_ENV = 'production';
// Ensures React is built in prod mode and Babel dev config doesn't apply.

const webpackConfig = webpackConfigBuilder(process.env.NODE_ENV);

webpack(webpackConfig).run((err, stats) => {
  const inSilentMode = args.s; // set to true when -s is passed on the command

  if (!inSilentMode) {
    console.log(colors.blue.bold('Generating minified bundle for production ' +
                                ' use via Webpack...'));
  }

  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings && !inSilentMode) {
    console.log(colors.yellow.bold('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  if (!inSilentMode) {
    console.log(`Webpack stats: ${stats}`);
  }

  // if we got this far, the build succeeded.
  console.log(colors.green.bold('Your app has been compiled in production ' +
                                'mode and written to /dist. ' +
                                'It\'s ready to roll!'));

  return 0;
});
/* eslint-enable no-console */
