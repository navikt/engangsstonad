var webpackConfig = require('./webpack.config.js');

module.exports = Object.assign(webpackConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'dist',
        historyApiFallback: true
    }
});
