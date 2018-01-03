const webpackConfig = require("./webpack.config.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

webpackConfig.plugins.push(
	new UglifyJsPlugin({
		sourceMap: true,
		uglifyOptions: {
			mangle: {
				keep_classnames: true,
				keep_fnames: true
			},
			compress: {
				keep_fnames: true,
				keep_classnames: true
			}
		}
	})
);

module.exports = webpackConfig;
