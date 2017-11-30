// @flow
import React from 'react';

import { Undertittel } from 'nav-frontend-typografi';

import ElementWrapper from './../../util/ElementWrapper';
import Image from './Image';

import styles from './imageWithText.less';

type Props = {
    imageUrl: string,
    text: string,
    alt: string
};

export const ImageWithText = (props: Props) => (
    <ElementWrapper>
        <Image imageUrl={props.imageUrl} alt={props.alt} />
        <Undertittel className={styles.text}>{props.text}</Undertittel>
    </ElementWrapper>
);

export default ImageWithText;
