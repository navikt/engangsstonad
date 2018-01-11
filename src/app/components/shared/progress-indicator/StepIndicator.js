import React from 'react';
import PropTypes from 'prop-types';

import 'nav-frontend-stegindikator-style';
import { Ingress } from 'nav-frontend-typografi';

import Step from './Step';

import './stepIndicator.less';

export const StepIndicator = (props) => (
	<div
		role="progressbar"
		aria-valuenow={props.activeStep}
		aria-valuemin="1"
		aria-valuemax={props.steps.length}>
		<div className="stepIndicator">
			<Ingress>{props.steps[props.activeStep - 1].title}</Ingress>
		</div>
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
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string
		})
	).isRequired,
	activeStep: PropTypes.number.isRequired
};

export default StepIndicator;
