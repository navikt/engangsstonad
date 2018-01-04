require('dotenv').config();
const jsdom = require('jsdom');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const axios = require('axios');

const { JSDOM } = jsdom;
const getDecorator = () => (axios({
    method: 'get',
    // eslint-disable-next-line
    url: 'https://appres-t1.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true'
}));

const reconfigureBuildWithDecorator = (decoratorResponse, config) => {
    const html = decoratorResponse.data;
    const { document } = (new JSDOM(html)).window;

    const header = (document.getElementById('header-withmenu')).innerHTML;
    const footer = (document.getElementById('footer-withmenu')).innerHTML;
    const scripts = (document.getElementById('scripts')).innerHTML;
    const styles = (document.getElementById('styles')).innerHTML;
    const megaMenu = (document.getElementById('megamenu-resources')).innerHTML;

    config.plugins.push(new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
        NAVHeading: header,
        NAVFooter: footer,
        NAVScripts: scripts,
        NAVStyles: styles,
        NAVMegaMenuResources: megaMenu
    }));

    return config;
};

const configDecorator = (config) => (
    getDecorator().then((response) => (reconfigureBuildWithDecorator(response, config)))
);

module.exports = configDecorator;
