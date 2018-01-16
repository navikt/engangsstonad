import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from 'nav-frontend-ikoner-assets';

import './iconLink.less';

export const IconLink = ({ iconKind, to, linkText, iconSize }) => (
	<div className="iconLink">
		<Icon kind={iconKind} size={iconSize} />
		<Link className="iconLink__link" to={to}>
			{linkText}
		</Link>
	</div>
);

IconLink.propTypes = {
	iconKind: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
	iconSize: PropTypes.string
};

IconLink.defaultProps = {
	iconSize: '16'
};

export default IconLink;
