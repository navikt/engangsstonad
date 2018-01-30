require('dotenv').config();

module.exports = {
	contentBase: 'dist',
	watchContentBase: true,
	historyApiFallback: true,
	publicPath: '/engangsstonad',
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
