import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './languageToggle.less';

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

LangaugeToggle.propTypes = {
	language: PropTypes.string.isRequired,
	toggleLanguage: PropTypes.func.isRequired
};

export default LangaugeToggle;
