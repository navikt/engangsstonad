import React from 'react';
import PropTypes from 'prop-types';
import { VenstreChevron } from 'nav-frontend-chevron';
import './backLink.less';

const BackLink = (props) => (
	<a className="backLink lenke" href={props.href}>
		<VenstreChevron stor />
		{props.text}
	</a>
);

BackLink.propTypes = {
	href: PropTypes.string.isRequired,
	text: PropTypes.string
};

BackLink.defaultProps = {
	text: 'Tilbake til forrige steg'
};

export default BackLink;
