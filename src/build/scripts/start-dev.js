const webpack = require('webpack');
const mustacheExpress = require('mustache-express');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const getDecorator = require('./decorator');

const PORT = 8081;

getDecorator().then((decoratorFragments) => {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(
        compiler,
        {
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
            stats: 'errors-only',
            publicPath: '/engangsstonad/dist',
            hot: true,
            historyApiFallback: true,
            liveReload: false,
        }
    );

    server.listen(PORT, '127.0.0.1', () =>
        console.log(`Started server on http://localhost:${PORT}`)
    );
});
