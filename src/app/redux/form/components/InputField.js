// @flow
import React from 'react';
import { Field } from 'redux-form';

import { Input as NavInput } from 'nav-frontend-skjema';

import renderNavField from './../renderNavField';

const renderNavInput = renderNavField(NavInput);

type Props = {
    name: string,
    label: string,
    validate: Function
};

const InputField = (props: Props) => {
    const {
        name,
        label,
        validate,
        ...other
    } = props;

    return (
        <Field
            name={name}
            validate={validate}
            component={renderNavInput}
            label={label}
            {...other}
        />
    );
};

export default InputField;
