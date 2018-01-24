import React from 'react';
import PropTypes from 'prop-types';

import StepIndicator from 'shared/progress-indicator/StepIndicator';
import BackLink from 'shared/back-link/BackLink';

import './engangsstonadContainer.less';

const steps = [
	{
		title: 'Relasjon til barn',
		label: '1'
	},
	{
		title: 'Tilknytning til Norge',
		label: '2'
	},
	{
		title: 'Oppsummering',
		label: '3'
	}
];

export const EngangsstonadContainer = (props) => (
	<div>
		<div className="linkIndicatorWrapper">
			<div className="linkIndicatorWrapper__link">
				<BackLink to="/engangsstonad" />
			</div>
			<StepIndicator steps={steps} activeStep={1} />
		</div>
		{props.children}
	</div>
);

EngangsstonadContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node.isRequired,
		PropTypes.arrayOf(PropTypes.node).isRequired
	]).isRequired
};

export default EngangsstonadContainer;
