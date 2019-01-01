const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
  const isProduction = env = 'production';
  return {
    mode: 'development',
    entry: {
      app: './src/app.js',
      ejercicio: './src/ejercicio.js'
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }]
    },
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