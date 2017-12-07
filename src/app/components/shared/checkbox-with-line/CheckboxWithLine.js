// @flow
import React from 'react';

import { Checkbox } from 'nav-frontend-skjema';

import DisplayTextWithLabel from '../text-with-label/DisplayTextWithLabel';
import './checkboxWithLine.less';

type Props = {
    content: Array<Object>
};

const CheckboxWithLine = (props: Props) => {
    const renderTexts = () => (
        props.content.map((entry, index) => (
            <DisplayTextWithLabel
                {...entry}
                // eslint-disable-next-line react/no-array-index-key
                key={`${entry.label}-${index}`}
            />))
    );

    return (
        <div className="checkboxWithLine">
            <Checkbox label="" />
            <div className="checkboxWithLine__content">
                {renderTexts()}
            </div>
        </div>
    );
};

export default CheckboxWithLine;
