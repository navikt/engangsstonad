// @flow
import React from 'react';

import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import styles from './radioGroup.less';

type Props = {
    listOfRadioData: Object,
    name: string
}

const RadioGroup = (props: Props) => (
    <SkjemaGruppe>
        {props.listOfRadioData.map((radioData) => (
            <Radio
                className={styles.radioButton}
                key={radioData.value}
                name={props.name}
                {...radioData}
            />
        ))}
    </SkjemaGruppe>
);

export default RadioGroup;
