import React, { Component } from 'react';
import Stepper from './../stepper/Stepper';

export default class StepBasedForm extends Component {
    render() {
        return (
            <div>
                <this.props.stepComponent />
                <Stepper />
            </div>
        );
    }
}
