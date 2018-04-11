import React, { Component } from 'react';
import ValidBase from './';
import DateInput from '../components/date-input/DateInput';

class ValidDateInput extends Component {
    render() {
        const { ...other } = this.props;
        const inputProps = { placeholder: 'dd.mm.åååå'};
        return <ValidBase component={DateInput} inputProps={inputProps} {...other} />;
    }
}

export default ValidDateInput;
