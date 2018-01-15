import React from 'react';
import PropTypes from 'prop-types';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './backLink.less';

const BackLink = (props) => (
	<div className="backLinkWrapper">
		<Lenke className="backLink" href={props.href}>
			<VenstreChevron stor />
			{props.text}
		</Lenke>
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
