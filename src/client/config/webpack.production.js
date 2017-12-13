var webpackConfig = require('./webpack.config.js');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

webpackConfig.plugins.push(new UglifyJsPlugin({ sourceMap: true }));

module.exports = webpackConfig;