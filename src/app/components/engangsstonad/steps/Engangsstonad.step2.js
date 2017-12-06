import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import ElementWrapper from './../../../util/ElementWrapper';
import RadioGroupField from '../../../redux/form/components/RadioGroupField';
import RadioOption from '../../../redux/form/components/RadioOption';
import DateInput from '../../shared/DateInput';
import AttachmentButton from '../../shared/AttachmentButton';
import AttachmentList from '../../shared/AttachmentList';
import NumberSelector from '../../shared/NumberSelector';
import DialogBox from '../../../components/shared/DialogBox';

import styles from './engangsstonad.step.less';

const radioData = [
    {
        label: 'Ja',
        value: 'Ja'
    },
    {
        label: 'Nei',
        value: 'Nei'
    }
];

const Step2 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Vi trenger mer informasjon fra deg om barnet eller barna søknaden gjelder</Normaltekst>
        </DialogBox>
        <RadioGroupField title="Er barnet født?" name="soknadstype">
            {radioData.map((data) => (
                <RadioOption label={data.label} value={data.value} />
            ))}
        </RadioGroupField>
        <Normaltekst className={styles.marginTopBottom}>Forventet antall barn</Normaltekst>
        <NumberSelector />
        <DateInput className={styles.marginTopBottom} label="Fødselsdato" />
        <DialogBox type="warning">
            <Normaltekst>
                Siden barnet ikke er født må du legge ved terminbekreftelse fra jordmor eller lege
            </Normaltekst>
        </DialogBox>
        <DateInput className={styles.marginTopBottom} label="Terminbekreftelse utstedt" />
        <AttachmentList />
        <AttachmentButton />
    </ElementWrapper>
);
export default Step2;
