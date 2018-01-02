const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const webpackConfig = {
    entry: ['babel-polyfill', './src/app/bootstrap.js'],
    output: {
        path: path.resolve(__dirname, './../../dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, './../app/assets/'),
            components: path.resolve(__dirname, './../app/components/'),
            shared: path.resolve(__dirname, './../app/components/shared/'),
            ducks: path.resolve(__dirname, './../app/redux/ducks/'),
            styles: path.resolve(__dirname, './../app/styles/'),
            util: path.resolve(__dirname, './../app/util/')
        }
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
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
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
                })
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader'
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
        new FlowWebpackPlugin(),
        new SpriteLoaderPlugin({ plainSprite: true })
    ]
};

module.exports = webpackConfig;
