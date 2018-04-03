require('dotenv').config();

const express = require('express');
const path = require('path');

const server = express();
const mockResponse = {
  fornavn: 'Henriette',
  etternavn: 'Ibsen',
  kjønn: 'K',
  fødselsdato: '1997-03-20'
};

const startServer = (html) => {
  server.get(
    ['/', '/foreldrepengesoknad-api/rest/personinfo?'], // , /^\/engangsstonad\/(?!.*dist).*$/
    (req, res) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      // Request methods you wish to allow
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );
      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
      );
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Pass to next layer of middleware

      res.send(mockResponse);
    }
  );

  server.get('/health/isAlive', (req, res) => res.sendStatus(200));
  server.get('/health/isReady', (req, res) => res.sendStatus(200));

  const port = process.env.PORT || 8888;
  server.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
  });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

startServer();
