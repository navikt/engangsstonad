// @flow
import React from 'react';

import DisplayTextWithLabel from '../shared/DisplayTextWithLabel';
import ElementWrapper from './../../util/ElementWrapper';
import ImageWithText from './../shared/ImageWithText';

type Props = {
    imgSrc: string,
    opplysningData: Array<Object>,
    title: string
};

const OpplysningPanel = (props: Props) => {
    const generateTextWithLabel = () => props.opplysningData.map((opplysninger) => (
        <DisplayTextWithLabel {...opplysninger} />
    ));

    return (
        <ElementWrapper>
            <ImageWithText imageUrl={props.imgSrc} text={props.title} />
            {generateTextWithLabel()}
        </ElementWrapper>
    );
};
export default OpplysningPanel;
