// @flow
import React from 'react';
import classnames from 'classnames/bind';

import { Checkbox } from 'nav-frontend-skjema';

import DisplayTextWithLabel from './DisplayTextWithLabel';

import styles from './checkboxWithLine.less';

const classNames = classnames.bind(styles);

type Props = {
    content: Array<Object>,
    className: string
};

export const CheckboxWithLine = (props: Props) => {
    const { className } = props;

    return (
        <div className={classNames('flexContainer', className)}>
            <Checkbox label=" " />
            <div className={styles.content}>
                {props.content.map((entry) => <DisplayTextWithLabel label={entry.label} text={entry.text} />)}
            </div>
        </div>
    );
};

export default CheckboxWithLine;
