// @flow
import React from 'react';

import { Undertittel } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';

import ElementWrapper from './../../util/ElementWrapper';

import styles from './iconWithText.less';

type Props = {
    kind: string,
    text: string
};

export const IconWithText = (props: Props) => (
    <ElementWrapper>
        <Icon kind={props.kind} className={styles.image} />
        <Undertittel className={styles.text}>{props.text}</Undertittel>
    </ElementWrapper>
);

export default IconWithText;
