import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './stepper.less';

export const Stepper = (props) => (
	<div className="stepper">
		{props.showStepAhead && (
			<StepperButton
				href={props.nextRoute}
				label="Fortsett med søknad"
				onNextButtonClicked={props.onNextButtonClicked}
			/>
		)}
		{props.showSubmission && (
			<StepperButton href={props.nextRoute} label="Send søknad" />
		)}
	</div>
);

Stepper.propTypes = {
	showStepAhead: PropTypes.bool,
	showSubmission: PropTypes.bool,
	nextRoute: PropTypes.string,
	onNextButtonClicked: PropTypes.func
};

Stepper.defaultProps = {
	showStepAhead: false,
	showSubmission: false,
	nextRoute: undefined,
	onNextButtonClicked: () => {}
};

const StepperButton = (props) => {
	const btnClassNames = classNames('knapp', {
		[`knapp--${props.knappType}`]: props.knappType
	});

	return (
		<Link
			to={props.href}
			className={btnClassNames}
			onClick={($e) => props.onNextButtonClicked($e)}>
			{props.label}
		</Link>
	);
};

StepperButton.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	knappType: PropTypes.string,
	onNextButtonClicked: PropTypes.func
};

StepperButton.defaultProps = {
	knappType: 'hoved',
	onNextButtonClicked: () => {}
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Stepper);
