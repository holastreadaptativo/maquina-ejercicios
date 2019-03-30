const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
  const isProduction = env = 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
    mode: process.env.NODE_ENV,
    entry: {
      app: './src/app.js',
      ejercicio: './src/ejercicio.js'
    },
    watch: isProduction ? false : true,
    watchOptions: {
      ignored: ['node_modules', 'public', 'functions']
    },
    output: {
    path: path.resolve(__dirname, 'public', 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },{
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourseMap: true
            }
          },{
            loader: 'sass-loader',
            options: {
              sourseMap: true
            }
          }]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/',
      historyApiFallback: true,
      port: 3000,
      open: true
    }
  };
};