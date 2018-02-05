require('dotenv').config();
const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const requestDecorator = () =>
	axios({
		method: 'get',
		url: process.env.DECORATOR_URL,
		validateStatus: (status) => status >= 200 || status === 302
	});

const getDecorator = () =>
	requestDecorator().then((decoratorResponse) => {
		const html = decoratorResponse.data;
		const { document } = new JSDOM(html).window;
		const prop = 'innerHTML';

		return {
			NAV_SCRIPTS: document.getElementById('scripts')[prop],
			NAV_STYLES: document.getElementById('styles')[prop],
			NAV_HEADING: document.getElementById('header')[prop],
			NAV_FOOTER: document.getElementById('footer')[prop]
		};
	});

module.exports = getDecorator;
