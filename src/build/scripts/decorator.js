require('dotenv').config();
const jsdom = require('jsdom');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const axios = require('axios');
const webpack = require('webpack');

const { JSDOM } = jsdom;

const getDecorator = (decoratorUrl) =>
	axios({
		method: 'get',
		url: decoratorUrl,
		validateStatus: (status) => status >= 200 || status === 302
	});

const reconfigureBuildWithDecorator = (decoratorResponse, oldConfig) => {
	const config = Object.assign({}, oldConfig);
	const html = decoratorResponse.data;
	const { document } = new JSDOM(html).window;
	try {
		const header = document.getElementById('header').innerHTML;
		const footer = document.getElementById('footer').innerHTML;
		const scripts = document.getElementById('scripts').innerHTML;
		const styles = document.getElementById('styles').innerHTML;

		config.module.rules.push({
			test: /index\.html$/,
			use: [
				{
					loader: 'mustache-loader',
					options: {
						render: {
							REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
							NAV_HEADING: header,
							NAV_FOOTER: footer,
							NAV_SCRIPTS: scripts,
							NAV_STYLES: styles
						}
					}
				}
			]
		});

		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './src/app/index.html',
				inject: 'body'
			})
		);
	} catch (e) {
		console.error('Dekoratør feilet; starter uten dekoratør.');
		console.error(e);
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './src/app/index.html',
				inject: 'body',
				NAVHeading: '',
				NAVFooter: '',
				NAVScripts: '',
				NAVStyles: ''
			})
		);
	}

	return config;
};

const prodDecorator =
	'http://appres.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true';
const testDecorator =
	'http://appres-t1.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true';

const configDecorator = (config, external) =>
	getDecorator(external ? prodDecorator : testDecorator).then((response) =>
		reconfigureBuildWithDecorator(response, config)
	);

module.exports = configDecorator;
