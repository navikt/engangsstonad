import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';
import ValidBase from './';

class ValidInput extends Component {
    render() {
        const { ...other } = this.props;
        return (
            <ValidBase component={Input} {...other} />
        );
    }
}

export default ValidInput;
