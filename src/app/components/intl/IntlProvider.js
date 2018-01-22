import React, { Component } from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import nn from 'react-intl/locale-data/nn';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';

addLocaleData([...nb, ...nn]);
class IntlProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locale: 'nb'
		};
	}

	componentWillMount() {
		console.log(navigator.language);
	}

	toggle(e) {
		console.log(e);
	}

	render() {
		const messages = this.state.locale === 'nb' ? nbMessages : nnMessages;
		return (
			<Provider locale="nb" messages={messages || {}}>
				{this.props.children}
			</Provider>
		);
	}
}
export default IntlProvider;
