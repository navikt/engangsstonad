import React from 'react';
import PropTypes from 'prop-types';

import 'nav-frontend-stegindikator-style';

import Step from './Step';

export const StepIndicator = (props) => (
	<div
		role="progressbar"
		aria-valuenow={props.activeStep}
		aria-valuemin="1"
		aria-valuemax={props.steps.length}>
		<ul className="stegindikator">
			{props.steps.map((step, index) => (
				<Step
					key={`${index + 1}`}
					activeStep={props.activeStep}
					step={index + 1}
					label={step.label}
					title={step.title}
				/>
			))}
		</ul>
	</div>
);

StepIndicator.propTypes = {
	steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	activeStep: PropTypes.number.isRequired
};

export default StepIndicator;
