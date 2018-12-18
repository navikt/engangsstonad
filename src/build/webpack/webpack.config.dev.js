const path = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.global.js');

webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
		inject: 'body',
		alwaysWriteToDisk: true
	})
);

webpackConfig.plugins.push(
	new HtmlWebpackHarddiskPlugin({
		outputPath: path.resolve(__dirname, '../../../dist/dev')
	}),
	new webpack.HotModuleReplacementPlugin(),
);

module.exports = Object.assign(webpackConfig, {
	devtool: 'inline-source-map',
	devServer: {
		hot: true
	}
});
