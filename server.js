require('dotenv').config();

const express = require('express');
const path = require('path');

const server = express();
server.use(express.static(path.resolve(__dirname, 'dist')));

console.log('Env:', process.env['foreldrepengesoeknad-api']);

server.get('/engangsstonad/?*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

server.get('/health/isAlive', (req, res) => res.sendStatus(200));
server.get('/health/isReady', (req, res) => res.sendStatus(200));

server.listen(8080, () => {
    console.log('App listening on port 8080');
});
