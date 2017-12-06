// @flow
import React from 'react';

import { Radio as NavRadio } from 'nav-frontend-skjema';

type Props = {
    name: string,
    label: string,
    value: string,
    disabled: boolean,
    checked: boolean
}

const RadioOption = (props: Props) => {
    const {
        name,
        label,
        value,
        disabled,
        checked,
        ...other
    } = props;

    return (
        <NavRadio
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
