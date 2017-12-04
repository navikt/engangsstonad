// @flow
import React from 'react';

import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import ElementWrapper from './../../util/ElementWrapper';

import styles from './displayTextWithLabel.less';

type Props = {
    label: string,
    text: string
};

export const DisplayTextWithLabel = (props: Props) => (
    <ElementWrapper>
        <EtikettLiten className={styles.marginTop}>{props.label}</EtikettLiten>
        <Normaltekst className={styles.marginBottom}>{props.text}</Normaltekst>
    </ElementWrapper>
);

export default DisplayTextWithLabel;
