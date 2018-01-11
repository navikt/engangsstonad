require('dotenv').config();
const jsdom = require('jsdom');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const axios = require('axios');

const { JSDOM } = jsdom;
const getDecorator = () =>
	axios({
		method: 'get',
		url:
			// eslint-disable-next-line max-len
			'http://appres-t1.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true',
		validateStatus: (status) => status >= 200 || status === 302
	});

const reconfigureBuildWithDecorator = (decoratorResponse, config) => {
	const html = decoratorResponse.data;
	const { document } = new JSDOM(html).window;

	const header = document.getElementById('header-withmenu').innerHTML;
	const footer = document.getElementById('footer-withmenu').innerHTML;
	const scripts = document.getElementById('scripts').innerHTML;
	const styles = document.getElementById('styles').innerHTML;
	const megaMenu = document.getElementById('megamenu-resources').innerHTML;

	config.plugins.push(
		new HtmlWebpackPlugin({
			template: './src/app/index.html',
			inject: 'body',
			NAVHeading: header,
			NAVFooter: footer,
			NAVScripts: scripts,
			NAVStyles: styles,
			NAVMegaMenuResources: megaMenu
		})
	);

	return config;
};

const runWithoutDecorator = (config) => {
	config.plugins.push(
		new HtmlWebpackPlugin({
			template: './src/app/index.html',
			inject: 'body',
			NAVHeading: '',
			NAVFooter: '',
			NAVScripts: '',
			NAVStyles: '',
			NAVMegaMenuResources: ''
		})
	);

	return config;
};

const configDecorator = (config) =>
	getDecorator().then(
		(response) => reconfigureBuildWithDecorator(response, config),
		() => runWithoutDecorator(config)
	);

module.exports = configDecorator;
