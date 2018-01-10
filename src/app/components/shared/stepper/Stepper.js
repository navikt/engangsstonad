import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './stepper.less';

export const Stepper = (props) => (
	<div className="stepper">
		{props.showStepBack && (
			<StepperButton href={props.previousRoute} label="Tilbake" />
		)}
		{props.showStepAhead && (
			<StepperButton href={props.nextRoute} label="Fortsett med søknad" />
		)}
		{props.showSubmission && (
			<StepperButton href={props.nextRoute} label="Send søknad" />
		)}
	</div>
);

Stepper.propTypes = {
	showStepAhead: PropTypes.bool,
	showStepBack: PropTypes.bool,
	showSubmission: PropTypes.bool,
	nextRoute: PropTypes.string,
	previousRoute: PropTypes.string
};

Stepper.defaultProps = {
	showStepAhead: false,
	showStepBack: false,
	showSubmission: false,
	nextRoute: undefined,
	previousRoute: undefined
};

const StepperButton = (props) => {
	const btnClassNames = classNames('knapp', {
		[`knapp--${props.knappType}`]: props.knappType
	});

	return (
		<Link to={props.href} className={btnClassNames}>
			{props.label}
		</Link>
	);
};

StepperButton.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	knappType: PropTypes.string
};

StepperButton.defaultProps = {
	knappType: 'hoved'
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Stepper);
