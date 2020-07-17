const path = require('path');

const dev = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;

module.exports = {
  mode: dev,
  entry: './src/scripts/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
};
