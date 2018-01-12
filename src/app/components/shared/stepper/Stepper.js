import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import createHistory from 'history/createBrowserHistory';
import './stepper.less';

const history = createHistory();

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

	const handleOnNextBtnClicked = ($e) => {
		props.onNextButtonClicked($e);
		history.push(props.href);
	};

	return (
		<Hovedknapp
			to={props.href}
			className={btnClassNames}
			onClick={($e) => handleOnNextBtnClicked($e)}>
			{props.label}
		</Hovedknapp>
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
