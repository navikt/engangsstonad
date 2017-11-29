// @flow
import React from 'react';

import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import styles from './displayTextWithLabel.less';

type Props = {
    label: string,
    text: string
};

export const DisplayTextWithLabel = (props: Props) => ([
    <EtikettLiten className={styles.marginTop}>{props.label}</EtikettLiten>,
    <Normaltekst className={styles.marginBottom}>{props.text}</Normaltekst>
]);

export default DisplayTextWithLabel;
