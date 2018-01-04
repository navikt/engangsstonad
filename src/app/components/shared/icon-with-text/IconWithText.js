import React from 'react';
import PropTypes from 'prop-types';

import { Undertittel } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import './iconWithText.less';

const IconWithText = (props) => (
	<div className="iconWithText">
		<Icon kind={props.kind} className="iconWithText__icon" />
		<Undertittel className="iconWithText__text">{props.text}</Undertittel>
	</div>
);

IconWithText.propTypes = {
	kind: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default IconWithText;
