// @flow
import React from 'react';
import { Radio } from 'nav-frontend-skjema';

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
    name: string
}

const RadioGruppe = (props: Props) => (
    props.listOfRadioData.map((radioData) => (
        <Radio
            {...radioData}
            key={radioData.value}
            name={props.name}
        />
    ))
);
export default RadioGruppe;
