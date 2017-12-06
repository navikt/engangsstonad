import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../../components/shared/DialogBox';
import ElementWrapper from '../../../util/ElementWrapper';
import OpplysningPanel from '../../shared/OpplysningPanel';

import styles from './engangsstonad.step.less';


const opplysningData = [
    {
        label: 'label',
        text: 'text'
    },
    {
        label: 'label',
        text: 'text'
    },
    {
        label: 'label',
        text: 'text'
    }
];

export const Step5 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening</Normaltekst>
        </DialogBox>
        <OpplysningPanel
            title="Stønad"
            iconKind="stonad"
            opplysningData={opplysningData}
        />
    </ElementWrapper>
);
export default Step5;
