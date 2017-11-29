// @flow
import React from 'react';

import { Undertittel } from 'nav-frontend-typografi';

import ElementWrapper from './../../util/ElementWrapper';

import styles from './imageWithText.less';

type Props = {
    imageUrl: string,
    text: string
};

export const ImageWithText = (props: Props) => (
    <ElementWrapper>
        <img src={props.imageUrl} alt="NAV Logo" className={styles.image} />
        <Undertittel className={styles.text}>{props.text}</Undertittel>
    </ElementWrapper>
);

export default ImageWithText;
