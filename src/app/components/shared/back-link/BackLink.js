import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { VenstreChevron } from 'nav-frontend-chevron';

import './backLink.less';

const BackLink = (props) => (
	<div className="backLinkWrapper">
		<Link className="backLink" to={props.to}>
			<VenstreChevron />
			{props.text}
		</Link>
	</div>
);

BackLink.propTypes = {
	to: PropTypes.string.isRequired,
	text: PropTypes.string
};

BackLink.defaultProps = {
	text: 'Tilbake'
};

export default BackLink;
