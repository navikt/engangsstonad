import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { VenstreChevron } from 'nav-frontend-chevron';
import './backLink.less';

const BackLink = (props) => (
	<div className="backLinkWrapper">
		<Link className="backLink lenke" to={props.href}>
			<VenstreChevron stor />
			{props.text}
		</Link>
	</div>
);

BackLink.propTypes = {
	href: PropTypes.string.isRequired,
	text: PropTypes.string
};

BackLink.defaultProps = {
	text: 'Tilbake til forrige steg'
};

export default BackLink;
