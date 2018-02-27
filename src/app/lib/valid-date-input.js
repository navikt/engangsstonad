/* eslint-disable */
import React, { Component } from 'react';
import ValidBase from './';
import DateInput from './../components/shared/date-input/DateInput';

class ValidDateInput extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { ...other } = this.props;
    return (
      <ValidBase component={DateInput} {...other} />
    );
  }
}

export default ValidDateInput;
/* eslint-enable */
