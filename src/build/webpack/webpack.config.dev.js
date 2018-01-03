const webpackConfig = require('./webpack.config.global.js');
const devServerConfig = require('./devserver.config');

webpackConfig.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    webpackConfig.entry
];

module.exports = Object.assign(webpackConfig, {
    devtool: 'inline-source-map',
    devServer: devServerConfig
});
