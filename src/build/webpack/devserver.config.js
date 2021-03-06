require('dotenv').config();
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
    before: (app) => {
        app.engine('html', mustacheExpress());
        app.set('views', `${__dirname}/../../../dist/dev`);
        app.set('view engine', 'mustache');
        app.get(['/', '/engangsstonad/?', /^\/engangsstonad\/(?!.*dist).*$/], (req, res) => {
            res.render(
                'index.html',
                Object.assign(
                    {
                        REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
                        LOGIN_URL: process.env.LOGINSERVICE_URL
                    },
                    decoratorFragments
                )
            );
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
    },
    publicPath: '/engangsstonad/dist'
});

module.exports = configureDevServer;
