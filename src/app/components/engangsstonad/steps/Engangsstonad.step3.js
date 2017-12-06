import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../../components/shared/DialogBox';

import ElementWrapper from '../../../util/ElementWrapper';

import styles from './engangsstonad.step.less';

export const Step3 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening</Normaltekst>
        </DialogBox>
    </ElementWrapper>
);
export default Step3;
