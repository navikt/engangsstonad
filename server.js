require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');

// Prometheus metrics
const prometheus = require('prom-client')
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  })

const server = express();

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {
                    REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
                    LOGIN_URL: process.env.LOGINSERVICE_URL
                },
                decoratorFragments
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            }
        );
    });

const startServer = (html) => {
    server.use(
        '/engangsstonad/dist/js',
        express.static(path.resolve(__dirname, 'dist/js'))
    );
    server.use(
        '/engangsstonad/dist/css',
        express.static(path.resolve(__dirname, 'dist/css'))
    );

    server.get(
        ['/', '/engangsstonad/?', /^\/engangsstonad\/(?!.*dist).*$/],
        (req, res) => {
            res.send(html);
            httpRequestDurationMicroseconds
                .labels(req.route.path)
                .observe(10)
        }
    );

    server.get('/actuator/metrics', (req, res) => {
        res.set('Content-Type', prometheus.register.contentType)
        res.end(prometheus.register.metrics())
      })

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
    .then(renderApp, (error) => logError('Failed to get decorator', error))
    .then(startServer, (error) => logError('Failed to render app', error));
