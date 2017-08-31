const path = require('path')

module.exports = function () {
  return {
    context: path.resolve(__dirname, 'app/scripts/'),
    entry: {
      main: './main.js'
    },
    // devtool: config.devBuild ? 'cheap-module-eval-source-map' : false,
    output: {
      path: path.resolve(__dirname, 'app/scripts/'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0']
            }
          }
          ]
        },
        {
          test: /\.coffee$/,
          use: [ 'coffee-loader' ]
        }
      ]
    },
    plugins: []
  }
}
