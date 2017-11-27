const path = require('path');
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
                    'babel-loader',
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                globalVars: {
                                    coreModulePath: '\'~\'',
                                    nodeModulesPath: '\'~\''
                                }
                            }
                        }
                    ]
                }),
                include: path.resolve(__dirname, './../app')
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: {
                                    nodeModulesPath: '~',
                                    coreModulePath: '~'
                                }
                            }
                        }
                    ]
                }),
                include: path.resolve(__dirname, './../../node_modules')
            },
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