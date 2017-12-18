// @flow
import React from 'react';
import { Input } from 'nav-frontend-skjema';

type Props = {
    label: string,
    className: string,
    onChange: Function
}

const DateInput = (props: Props) => (
    <Input
        className={props.className}
        inputClassName="dateInput"
        placeholder="dd.mm.yyyy"
        label={props.label}
        bredde="S"
        onChange={props.onChange}
    />
);
export default DateInput;
