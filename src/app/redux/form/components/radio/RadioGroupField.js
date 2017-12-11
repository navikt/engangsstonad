// @flow
import React from 'react';
import { Field } from 'redux-form';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import renderNavField from '../../renderNavField';

type Props = {
    title: string,
    name: string,
    listOfRadioData: Array<Object>
}

const convertBoolean = (value) => {
    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    return value;
};

const renderRadioGroupField = renderNavField((props: Props) => {
    const {
        children,
        title,
        ...otherProps
    } = props;

    const actualValue = convertBoolean(otherProps.value);

    return (
        <SkjemaGruppe title={title} >
            {children.map((radioOption) => (
                React.cloneElement(radioOption, {
                    key: JSON.stringify(radioOption.props.value),
                    ...otherProps,
                    ...radioOption.props,
                    actualValue
                })
            ))}
        </SkjemaGruppe>
    );
});

const RadioGroupField = (props) => (
    <Field
        component={renderRadioGroupField}
        {...props}
    />
);

export default RadioGroupField;
