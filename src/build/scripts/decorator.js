require('dotenv').config();
const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const getDecorator = (decoratorUrl) =>
	axios({
		method: 'get',
		url: decoratorUrl,
		validateStatus: (status) => status >= 200 || status === 302
	});

const reconfigureBuildWithDecorator = (decoratorResponse, config) => {
	const html = decoratorResponse.data;
	const { document } = new JSDOM(html).window;

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
						REST_API_URL:
							process.env.FORELDREPENGESOKNAD_API_URL || '{{{REST_API_URL}}}',
						NAV_HEADING: header,
						NAV_FOOTER: footer,
						NAV_SCRIPTS: scripts,
						NAV_STYLES: styles
					}
				}
			}
		]
	});

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
