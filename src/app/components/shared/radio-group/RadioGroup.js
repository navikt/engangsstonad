// @flow
import React from 'react';

import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

type Props = {
    listOfRadioData: Object,
    name: string,
    title: string
}

const RadioGroup = (props: Props) => (
    <div>
        <SkjemaGruppe title={props.title}>
            {props.listOfRadioData.map((radioData) => (
                <Radio
                    key={radioData.value}
                    name={props.name}
                    {...radioData}
                />
            ))}
        </SkjemaGruppe>
    </div>
);

export default RadioGroup;
