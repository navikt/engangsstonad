const webpackConfig = require('./webpack.config.global.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
		inject: 'body'
	})
);

webpackConfig.optimization = {
    minimizer: [
        new TerserPlugin({
            sourceMap: true,
        })
    ]
};

module.exports = webpackConfig;
