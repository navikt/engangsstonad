import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from 'nav-frontend-ikoner-assets';

import './iconLink.less';

export const IconLink = ({ iconKind, to }) => (
	<div className="iconLink">
		<Icon kind={iconKind} size="15" />
		<Link className="iconLink__link" to={to}>
			Les mer om terminbekreftelsen
		</Link>
	</div>
);

IconLink.propTypes = {
	iconKind: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
};

export default IconLink;
