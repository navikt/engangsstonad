import React from 'react';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../../components/shared/DialogBox';
import CheckboxWithLine from '../../shared/CheckboxWithLine';
import ElementWrapper from '../../../util/ElementWrapper';

import styles from './engangsstonad.step.less';

const checkboxData = [
    {
        label: 'NAVN',
        text: 'Lise Haugdahl'
    },
    {
        label: 'FØDSELSNUMMER',
        text: '01111799999'
    }
];

export const Step4 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening</Normaltekst>
        </DialogBox>
        <Undertittel className={styles.marginTopBottom}>Gjelder søknaden dette barnet?</Undertittel>
        <CheckboxWithLine content={checkboxData} className={styles.marginTopBottom} />
        <CheckboxWithLine content={checkboxData} className={styles.marginTopBottom} />
    </ElementWrapper>
);

export default Step4;
