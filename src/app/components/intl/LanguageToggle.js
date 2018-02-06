import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './languageToggle.less';

/* eslint-disable jsx-a11y/anchor-is-valid */
const LangaugeToggle = ({ language, toggleLanguage }) => (
	<div className="languageToggle">
		<a
			className={classnames({ unactive: language === 'nb' })}
			href="#"
			onClick={() => toggleLanguage('nb')}>
			Bokmål
		</a>
		<a
			className={classnames({ unactive: language === 'nn' })}
			href="#"
			onClick={() => toggleLanguage('nn')}>
			Nynorsk
		</a>
	</div>
);
/* eslint-enable jsx-a11y/anchor-is-valid */

LangaugeToggle.propTypes = {
	language: PropTypes.string.isRequired,
	toggleLanguage: PropTypes.func.isRequired
};

export default LangaugeToggle;
