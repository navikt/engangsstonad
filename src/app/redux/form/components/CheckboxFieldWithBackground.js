// @flow
import React from 'react';

import CheckboxField from './CheckboxField';

import styles from './checkboxFieldWithBackground.less';

type Props = {
    name: string,
    label: string,
    validate: ?Function
}

const CheckboxFieldWithBackground = (props: Props) => (
    <div className={styles.background}>
        <CheckboxField name={props.name} label={props.label} validate={props.validate} />
    </div>
);

export default CheckboxFieldWithBackground;
