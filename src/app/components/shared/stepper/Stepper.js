import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Hovedknapp } from 'nav-frontend-knapper';

import styles from './stepper.less';

const Stepper = (props) => (
    <div className={styles.stepper}>
        {
            props.showStepBack &&
            <StepperButton href={props.previousRoute} label="Tilbake" />
        }
        {
            props.showStepAhead &&
            <StepperButton href={props.nextRoute} label="Fortsett med søknad" />
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
    previousRoute: PropTypes.string
};

Stepper.defaultProps = {
    showStepAhead: false,
    showStepBack: false,
    showSubmission: false,
    nextRoute: undefined,
    previousRoute: undefined
};

const StepperButton = (props) => (
    <Link to={props.href} className={styles.marginRight}>
        <props.component>
            {props.label}
        </props.component>
    </Link>
);

StepperButton.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    component: PropTypes.func
};

StepperButton.defaultProps = {
    component: Hovedknapp
};

export default Stepper;
