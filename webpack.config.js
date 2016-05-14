import path from 'path';

// const developmentEnvironment = 'development';
// const testEnvironment = 'test';
// const productionEnvironment = 'production';

export default function getConfig() {
  return {
    context: path.join(__dirname, '/src'),
    entry: [
      './index.js',
    ],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ['babel'],
        },
      ],
    },
  };
}
