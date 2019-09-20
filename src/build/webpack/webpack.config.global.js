const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
    entry: ['babel-polyfill', './src/app/bootstrap.tsx'],
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/bundle.js',
        publicPath: '/engangsstonad/dist'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            assets: path.resolve(__dirname, './../../app/assets/'),
            components: path.resolve(__dirname, './../../app/components/'),
            containers: path.resolve(__dirname, './../../app/containers/'),
            actions: path.resolve(__dirname, './../../app/redux/actions/'),
            reducers: path.resolve(__dirname, './../../app/redux/reducers'),
            styles: path.resolve(__dirname, './../../app/styles/'),
            util: path.resolve(__dirname, './../../app/util/'),
            common: path.resolve(__dirname, './../../common/'),
            storage: path.resolve(__dirname, './../../storage/')
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
                        loader: MiniCssExtractPlugin.loader
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
            filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
            disable: false,
            allChunks: true
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
