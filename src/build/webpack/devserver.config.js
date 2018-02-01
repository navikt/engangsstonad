require('dotenv').config();

const publicPath = '/engangsstonad';

module.exports = {
	historyApiFallback: {
		index: `${publicPath}/index.html`
	},
	publicPath,
	watchContentBase: true,
	quiet: false,
	noInfo: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	}
};
