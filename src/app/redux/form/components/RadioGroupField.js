// @flow
import React from 'react';
import { Field } from 'redux-form';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import renderNavField from './../renderNavField';

type Props = {
    title: string,
    name: string,
    listOfRadioData: Array<Object>
}

const renderRadioGroupField = renderNavField((props: Props) => {
    const { children, id, ...otherProps } = props;
    const actualValue = otherProps.value;

    return (
        <SkjemaGruppe title={props.title} >
            {children.map((radioOption) => (
                React.cloneElement(radioOption, {
                    ...otherProps,
                    ...radioOption.props,
                    actualValue: actualValue
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
