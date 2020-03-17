const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

console.log(process.env.NODE_ENV === 'development');

const webpackConfig = {
    entry: ['react-hot-loader/patch', 'babel-polyfill', './src/app/bootstrap.tsx'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/bundle.js',
        publicPath: '/engangsstonad/dist'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            actions: path.resolve(__dirname, './../../app/redux/actions/'),
            assets: path.resolve(__dirname, './../../app/assets/'),
            common: path.resolve(__dirname, './../../common/'),
            components: path.resolve(__dirname, './../../app/components/'),
            containers: path.resolve(__dirname, './../../app/containers/'),
            reducers: path.resolve(__dirname, './../../app/redux/reducers'),
            storage: path.resolve(__dirname, './../../storage/'),
            styles: path.resolve(__dirname, './../../app/styles/'),
            util: path.resolve(__dirname, './../../app/util/'),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre'
            },
            {
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, './../..')],
                loader: require.resolve('ts-loader')
            },

            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                coreModulePath: '"~"',
                                nodeModulesPath: '"~"'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = webpackConfig;
