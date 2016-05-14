// This script copies src/index.html into /dist/index.html
/* eslint-disable no-console */

import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build,
  // need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="bundle.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (writeErr) => {
    if (writeErr) {
      return console.log(err);
    }
    return true;
  });

  return console.log(colors.green('index.html written to /dist'));
});
/* eslint-enable no-console */
