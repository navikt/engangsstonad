import React, { Component } from 'react';
import { connect } from 'react-redux';
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
	}

	render() {
		const messages = this.props.language === 'nb' ? nbMessages : nnMessages;
		return (
			<Provider locale="nb" messages={messages || {}}>
				{this.props.children}
			</Provider>
		);
	}
}

IntlProvider.propTypes = {
	children: PropTypes.node.isRequired,
	language: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	language: state.commonReducer.language
});

export default connect(mapStateToProps)(IntlProvider);
