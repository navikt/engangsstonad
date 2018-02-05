require('dotenv').config();
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
	before: (app) => {
		app.engine('html', mustacheExpress());
		app.set('views', `${__dirname}/../../../dist/dev`);
		app.set('view engine', 'mustache');
		app.get(['/', '/engangsstonad/?', '/engangsstonad/**'], (req, res) => {
			res.render('index.html', {
				REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
				...decoratorFragments
			});
		});
	},
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
});

module.exports = configureDevServer;
