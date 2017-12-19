import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './stepper.less';

export const Stepper = (props) => (
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

const StepperButton = (props) => {
    const btnClassNames = classNames('knapp', {
        [`knapp--${props.knappType}`]: props.knappType && !props.disabled,
        'knapp--disabled': props.disabled
    });

    const onClickListener = ($event) => {
        if (props.disabled) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    };

    const tabIndex = () => (props.disabled ? -1 : 0);

    return (
        <Link
            to={props.href}
            className={btnClassNames}
            onClick={onClickListener}
            tabIndex={tabIndex()}
            aria-disabled={props.disabled}
        >
            {props.label}
        </Link>
    );
};

StepperButton.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    knappType: PropTypes.string,
    disabled: PropTypes.bool
};

StepperButton.defaultProps = {
    disabled: false,
    knappType: 'hoved'
};

const mapStateToProps = (state) => ({
    nextButtonEnabled: state.engangsstonadReducer.nextButtonEnabled
});

export default connect(mapStateToProps)(Stepper);
