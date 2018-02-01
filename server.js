require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const server = express();
server.use(
	'/engangsstonad/js',
	express.static(path.resolve(__dirname, 'dist/js'))
);
server.use(
	'/engangsstonad/css',
	express.static(path.resolve(__dirname, 'dist/css'))
);

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.get(['/engangsstonad/?', '/engangsstonad/**'], (req, res) => {
	res.render('index.html', {
		REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL
	});
});

server.get('/health/isAlive', (req, res) => res.sendStatus(200));
server.get('/health/isReady', (req, res) => res.sendStatus(200));

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`App listening on port: ${port}`);
});
