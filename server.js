require('dotenv').config();

const express = require('express');
const path = require('path');

const server = express();
server.use('/engangsstonad/js', express.static(path.resolve(__dirname, 'dist/js')));
server.use('/engangsstonad/css', express.static(path.resolve(__dirname, 'dist/css')));
server.set('views', `${__dirname  }/dist`);
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

server.get('/engangsstonad', (req, res) => {
	res.render('index.html', {
		REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL
	});
});

server.get('/health/isAlive', (req, res) => res.sendStatus(200));
server.get('/health/isReady', (req, res) => res.sendStatus(200));

server.listen(8080, () => {
	console.log('App listening on port 8080');
});
