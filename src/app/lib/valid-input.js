/* eslint-disable */
import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';
import ValidBase from './';

class ValidInput extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { ...other } = this.props;
        return (
            <ValidBase component={Input} {...other} />
        );
    }
}

export default ValidInput;
/* eslint-enable */
