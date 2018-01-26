import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Sidetittel } from 'nav-frontend-typografi';

import './header.less';

export const Header = ({ title, illustration }) => (
	<div
		className={classNames('header', {
			'header--withIllustration':
				illustration !== null && illustration !== undefined
		})}>
		{illustration || <Sidetittel>{title}</Sidetittel>}
	</div>
);

Header.propTypes = {
	title: PropTypes.string,
	illustration: PropTypes.element
};

Header.defaultProps = {
	title: '',
	illustration: null
};

export default Header;
