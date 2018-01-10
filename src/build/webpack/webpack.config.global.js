const path = require('path');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const webpackConfig = {
	entry: ['babel-polyfill', './src/app/bootstrap.js'],
	output: {
		path: path.resolve(__dirname, './../../../dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			assets: path.resolve(__dirname, './../../app/assets/'),
			components: path.resolve(__dirname, './../../app/components/'),
			shared: path.resolve(__dirname, './../../app/components/shared/'),
			ducks: path.resolve(__dirname, './../../app/redux/ducks/'),
			styles: path.resolve(__dirname, './../../app/styles/'),
			util: path.resolve(__dirname, './../../app/util/'),
			apps: path.resolve(__dirname, './../../apps/')
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
				include: [
					path.resolve(__dirname, './../../app'),
					path.resolve(__dirname, './../../apps')
				],
				loader: require.resolve('ts-loader')
			},

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
									coreModulePath: '"~"',
									nodeModulesPath: '"~"'
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
		new FlowWebpackPlugin(),
		new SpriteLoaderPlugin({ plainSprite: true })
	]
};

module.exports = webpackConfig;
