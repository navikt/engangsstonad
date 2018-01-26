import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Ikon from 'nav-frontend-ikoner-assets';

export const Step = ({ step, activeStep, title }) => {
	const passed = step < activeStep;

	return (
		<li
			aria-label={title}
			className={classnames('stegindikator__steg', {
				'stegindikator__steg--inaktiv': step > activeStep,
				'stegindikator__steg--aktiv': step === activeStep
			})}>
			{passed ? <Ikon kind="ok-sirkel-fylt" /> : <span>{step}</span>}
		</li>
	);
};

Step.propTypes = {
	step: PropTypes.number.isRequired,
	activeStep: PropTypes.number.isRequired,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default Step;
