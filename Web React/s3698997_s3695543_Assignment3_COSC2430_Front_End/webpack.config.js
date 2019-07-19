const webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: './main.js',
     
    output: {
       filename: 'index.js',
       publicPath: '/'
    },
     
    devServer: {
       inline: true,
       port: 8080,
       historyApiFallback: true,

    },
     
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
                 
             query: {
                presets: ['es2015', 'react']
             }
          },
          {
              test: /\.css?$/,
              exclude: /node_modules/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          }
       ]
    }
 }
 
 module.exports = config;