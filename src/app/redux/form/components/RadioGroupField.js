// @flow
import React from 'react';
import { Field } from 'redux-form';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import RadioOption from './RadioOption';
import renderNavField from './../renderNavField';

import styles from './radioGroupField.less';

type Props = {
    title: string,
    name: string,
    listOfRadioData: Array<Object>
}

const renderRadioGroupField = renderNavField((props: Props) => {
    const actualValueStringified = JSON.stringify((props.value));

    console.log(actualValueStringified);

    return (
        <SkjemaGruppe title={props.title} >
            {props.listOfRadioData.map((radioData) => (
                <RadioOption
                    className={styles.radioButton}
                    key={radioData.value}
                    name={props.name}
                    {...radioData}
                />
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
