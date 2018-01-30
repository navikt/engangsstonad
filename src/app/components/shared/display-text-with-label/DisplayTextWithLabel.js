import React from 'react';
import PropTypes from 'prop-types';

import { EtikettLiten, Element } from 'nav-frontend-typografi';

import './displayTextWithLabel.less';

export const DisplayTextWithLabel = (props) => (
	<div className="textWithLabel">
		<EtikettLiten className="textWithLabel__label">{props.label}</EtikettLiten>
		<Element className="textWithLabel__text">{props.text}</Element>
	</div>
);

DisplayTextWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default DisplayTextWithLabel;
