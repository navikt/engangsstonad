const path = require('path');
const lessLoader = require('./util/less-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
    entry: './src/app/bootstrap.js',
    output: {
        path: path.resolve(__dirname, './../../dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'eslint-loader', options: { emitWarning: true } }
                ],
                exclude: /node_modules/
            },
            // 1st arg is set as exclude
            lessLoader(/node_modules/, true),
            lessLoader(path.resolve(__dirname, './../app')),
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        }),
        new FlowWebpackPlugin()
    ]
};

module.exports = webpackConfig;