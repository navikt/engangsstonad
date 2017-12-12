// @flow
import React from 'react';

import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import './radioGroup.less';

type Props = {
    listOfRadioData: Object,
    name: string,
    title: string
}

const RadioGroup = (props: Props) => (
    <div>
        <Normaltekst>{props.title}</Normaltekst>
        <SkjemaGruppe className="radioGroup">
            {props.listOfRadioData.map((radioData) => (
                <Radio
                    className="radioGroup__radioButton"
                    key={radioData.value}
                    name={props.name}
                    {...radioData}
                />
            ))}
        </SkjemaGruppe>
    </div>
);

export default RadioGroup;