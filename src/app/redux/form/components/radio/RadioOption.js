// @flow
import React from 'react';

import { Radio as NavRadio } from 'nav-frontend-skjema';

import styles from './radioOption.less';

type Props = {
    name: string,
    label: string,
    value: string,
    disabled: boolean,
    actualValue: any
}

const RadioOption = (props: Props) => {
    const {
        name,
        label,
        value,
        disabled,
        actualValue,
        ...other
    } = props;

    const checked = value === actualValue;

    return (
        <NavRadio
            className={styles.button}
            name={name}
            label={label}
            value={value}
            checked={checked}
            disabled={disabled}
            {...other}
        />
    );
};

export default RadioOption;
