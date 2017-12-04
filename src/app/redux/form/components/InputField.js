// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Input as NavInput } from 'nav-frontend-skjema';

import renderNavField from './../renderNavField';

const renderNavInput = renderNavField(NavInput);

type Props = {
    name: string,
    type: string,
    label: string,
    validate: Function
};

const InputField = (props: Props) => (
    <Field
        name={props.name}
        validate={props.validate}
        component={renderNavInput}
        type={props.type}
        label={props.label}
        {...props}
    />
);

export default InputField;
