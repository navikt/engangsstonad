const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const webpackConfig = {
    entry: './src/app/bootstrap.js',
    output: {
        path: path.resolve(__dirname, './../../dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader',
                'eslint-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader?{"globalVars":{"nodeModulesPath":"\'~\'", "coreModulePath":"\'~\'"}}'
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        }),
        new FlowWebpackPlugin()
    ]
};

module.exports = webpackConfig;