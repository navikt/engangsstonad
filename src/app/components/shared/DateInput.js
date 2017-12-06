import React from 'react';
import { Input } from 'nav-frontend-skjema';
import styles from './dateInput.less';

const DateInput = () => (
    <Input
        inputClassName={styles.dateInput}
        placeholder="dd.mm.yyyy"
        label="Fødeslsdatao"
        bredde="S"
    />
);
export default DateInput;
