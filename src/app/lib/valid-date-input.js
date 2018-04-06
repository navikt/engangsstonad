import React, { Component } from 'react';
import ValidBase from './';
import DateInput from '../components/date-input/DateInput';

class ValidDateInput extends Component {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={DateInput} {...other} />;
    }
}

export default ValidDateInput;
