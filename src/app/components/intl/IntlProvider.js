import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import nn from 'react-intl/locale-data/nn';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';

class IntlProvider extends Component {
	constructor(props) {
		super(props);
		addLocaleData([...nb, ...nn]);
		this.state = {
			locale: 'nb'
		};
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

IntlProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default IntlProvider;
