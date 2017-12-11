import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';

import './stepper.less';

const Stepper = (props) => (
    <div className="stepper">
        {
            props.showStepBack &&
            <StepperButton href={props.previousRoute} label="Tilbake" />
        }
        {
            props.showStepAhead &&
            <StepperButton disabled={!props.nextButtonEnabled} href={props.nextRoute} label="Fortsett med søknad" />
        }
        {
            props.showSubmission &&
            <StepperButton href={props.nextRoute} label="Send søknad" />
        }
    </div>
);

Stepper.propTypes = {
    showStepAhead: PropTypes.bool,
    showStepBack: PropTypes.bool,
    showSubmission: PropTypes.bool,
    nextRoute: PropTypes.string,
    previousRoute: PropTypes.string,
    nextButtonEnabled: PropTypes.bool
};

Stepper.defaultProps = {
    showStepAhead: false,
    showStepBack: false,
    showSubmission: false,
    nextRoute: undefined,
    previousRoute: undefined,
    nextButtonEnabled: false
};

const StepperButton = (props) => (
    <Link to={props.href}>
        <props.component disabled={props.disabled}>
            {props.label}
        </props.component>
    </Link>
);

StepperButton.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    component: PropTypes.func,
    disabled: PropTypes.bool
};

StepperButton.defaultProps = {
    component: Hovedknapp,
    disabled: false
};

export default Stepper;
