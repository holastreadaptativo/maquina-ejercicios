const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
  const isProduction = env = 'production';
  return {
    //stats: 'verbose',
    mode: process.env.NODE_ENV,
    entry: {
      maquina: './src/maquina.js',
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
      }, /*{
        test: /\.(ttf|woff)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }
      }*/
      {
        test: /\.(ttf|woff)$/,
        loader: "url-loader?limit=10000&name=[name].[ext]"
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "resolve-url-loader", 
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false,
            }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({ filename: "[name].css" }),
        new TerserPlugin()
      ]
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