import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './stepper.less';

export const Stepper = (props) => (
	<div className="stepper">
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
	showSubmission: PropTypes.bool,
	nextRoute: PropTypes.string
};

Stepper.defaultProps = {
	showStepAhead: false,
	showSubmission: false,
	nextRoute: undefined
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
