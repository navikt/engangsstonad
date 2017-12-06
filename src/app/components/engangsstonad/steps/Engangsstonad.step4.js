import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../../components/shared/DialogBox';
import ElementWrapper from '../../../util/ElementWrapper';
import DisplayTextWithLabel from './../../shared/DisplayTextWithLabel';

export const Step4 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>
                Les nøye gjennom oppsummeringen før du sender inn søknaden.
                Hvis du trenger å gjøre endringer kan du gå tilbake til tidligere steg
            </Normaltekst>
        </DialogBox>
        <DisplayTextWithLabel label="Navn" text="Lise Mari Haugland" />
    </ElementWrapper>
);

export default Step4;
