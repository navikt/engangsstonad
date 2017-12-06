import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../../components/shared/DialogBox';

import ElementWrapper from '../../../util/ElementWrapper';
import RadioGroup from '../../../redux/form/components/RadioGroupField';
import DateInput from '../../shared/DateInput';
import AttachmentButton from '../../shared/AttachmentButton';
import AttachmentList from '../../shared/AttachmentList';
import NumberSelector from '../../shared/NumberSelector';

import styles from './engangsstonad.step.less';

const radioData = [
    {
        label: 'Ja.',
        value: 'Ja'
    },
    {
        label: 'Nei',
        value: 'Nei'
    }
];

const Step6 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Vi trenger å vite mer informasjon om fødselen som søknaden gjelder.</Normaltekst>
        </DialogBox>

        <RadioGroup
            className={styles.radioGruppe}
            title="Er barnet født?"
            name="soknadstype"
            listOfRadioData={radioData}
        />


        <NumberSelector />
        <DateInput />

        <DialogBox type="warning">
            <Normaltekst>Vi trenger å vite mer informasjon om fødselen som søknaden gjelder.</Normaltekst>
        </DialogBox>

        <DateInput />

        <AttachmentList />
        <AttachmentButton />

    </ElementWrapper>
);
export default Step6;
