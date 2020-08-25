import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import ValidBase from './';

class ValidSelect extends Component {
    // eslint-disable-line react/prefer-stateless-function
    render() {
        const { ...other } = this.props;
        return <ValidBase component={Select} {...other} />;
    }
}

export default ValidSelect;
