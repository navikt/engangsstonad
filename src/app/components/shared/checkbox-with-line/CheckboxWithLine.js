// @flow
import React from 'react';
import classnames from 'classnames/bind';

import { Checkbox } from 'nav-frontend-skjema';

import DisplayTextWithLabel from '../text-with-label/DisplayTextWithLabel';
import './checkboxWithLine.less';

type Props = {
    content: Array<Object>,
    className: string
};

const CheckboxWithLine = (props: Props) => {
    const { className } = props;

    const renderTexts = () => (
        props.content.map((entry, index) => (
            <DisplayTextWithLabel
                {...entry}
                // eslint-disable-next-line react/no-array-index-key
                key={`${entry.label}-${index}`}
            />))
    );

    return (
        <div className={classnames('checkboxWithLine', className)}>
            <Checkbox label="" />
            <div className="checkboxWithLine__content">
                {renderTexts()}
            </div>
        </div>
    );
};

export default CheckboxWithLine;
