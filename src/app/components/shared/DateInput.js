// @flow
import React from 'react';
import { Input } from 'nav-frontend-skjema';
import styles from './dateInput.less';

type Props = {
    label: string
}

const DateInput = (props: Props) => (
    <Input
        inputClassName={styles.dateInput}
        placeholder="dd.mm.yyyy"
        label={props.label}
        bredde="S"
    />
);
export default DateInput;
