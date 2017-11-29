const ExtractTextPlugin = require('extract-text-webpack-plugin');

const lessLoader = function (exclusion, loadAsCSSModules) {
    return {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: loadAsCSSModules ? {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]__[hash:base64:5]'
                    } : {}
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
        exclude: exclusion
    };
};

module.exports = lessLoader;
