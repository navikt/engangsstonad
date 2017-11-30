// @flow
import React from 'react';

import DisplayTextWithLabel from '../shared/DisplayTextWithLabel';
import ElementWrapper from './../../util/ElementWrapper';
import ImageWithText from './../shared/ImageWithText';

type Props = {
    imgSrc: string,
    opplysningData: Array<Object>,
    title: string,
    imgAlt: string
};

const OpplysningPanel = (props: Props) => (
    <ElementWrapper>
        <ImageWithText imageUrl={props.imgSrc} text={props.title} alt={props.imgAlt} />
        {props.opplysningData.map((opplysninger) => (
            <DisplayTextWithLabel key={opplysninger.text} {...opplysninger} />
        ))}
    </ElementWrapper>
);

export default OpplysningPanel;
