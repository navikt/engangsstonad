// @flow
import React from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import styles from './radioGruppe.less';

export const satsRadioData = [
    {
        label: '80%',
        value: 80
    },
    {
        label: '100%',
        value: 100
    }
];

export const omsorgRadioData = [
    {
        label: 'Felles omsorg',
        value: 'Felles omsorg'
    },
    {
        label: 'Aleneomsorg',
        value: 'Aleneomsorg'
    }
];

type Props = {
    listOfRadioData: Object,
}

const RadioGruppe = (props: Props) => {
    const radioKnapper = () => props.listOfRadioData.map((radioData) => (
        <Radio
            className={styles.radioKnapp}
            {...radioData}
            key={radioData.value}
            name={props.name}
        />
    ));

    return (
        <SkjemaGruppe className={styles.radioGruppe}>
            {radioKnapper()}
        </SkjemaGruppe>
    );
};
export default RadioGruppe;
