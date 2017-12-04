// @flow
import React from 'react';

import DisplayTextWithLabel from '../shared/DisplayTextWithLabel';
import ElementWrapper from './../../util/ElementWrapper';
import IconWithText from './IconWithText';

type Props = {
    iconKind: string,
    opplysningData: Array<Object>,
    title: string
};

const OpplysningPanel = (props: Props) => (
    <ElementWrapper>
        <IconWithText kind={props.iconKind} text={props.title} />
        {props.opplysningData.map((opplysninger) => (
            <DisplayTextWithLabel key={opplysninger.text} {...opplysninger} />
        ))}
    </ElementWrapper>
);

export default OpplysningPanel;
