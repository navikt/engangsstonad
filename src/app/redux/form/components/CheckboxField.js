// @flow
import React from 'react';
import { Field } from 'redux-form';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import styles from './checkboxField.less';

import renderNavField from './../renderNavField';

const renderNavCheckboxField = renderNavField(({ onChange, label, ...otherProps }) => (
    <NavCheckbox
        className={styles.checkbox}
        onChange={(e) => onChange(e.target.checked)}
        checked={otherProps.value}
        label={label}
        {...otherProps}
    />
));

type Props = {
    name: string,
    label: string,
    validate: Function
}

const CheckboxField = (props: Props) => {
    const {
        name,
        validate,
        label,
        ...other
    } = props;

    return (
        <Field
            name={name}
            validate={validate}
            component={renderNavCheckboxField}
            label={label}
            {...other}
        />
    );
};

export default CheckboxField;
