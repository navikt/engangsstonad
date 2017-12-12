// @flow
import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import DateInput from '../../shared/date-input/DateInput';
import AttachmentButton from '../../shared/attachment-button/AttachmentButton';
import AttachmentList from '../../shared/attachment-list/AttachmentList';
import NumberSelector from '../../shared/number-selector/NumberSelector';
import DialogBox from '../../shared/dialog-box/DialogBox';
import RadioGroup from './../../shared/radio-group/RadioGroup';


const radioData = [
    {
        label: 'Ja',
        value: true
    },
    {
        label: 'Nei',
        value: false
    }
];

const Step2 = () => (
    <div className="engangsstonadStep2">
        <DialogBox type="info">
            <Normaltekst>Vi trenger mer informasjon fra deg om barnet eller barna søknaden gjelder</Normaltekst>
        </DialogBox>

        <RadioGroup title="Er barnet født?" name="barnFodt" listOfRadioData={radioData} />
        <div>
            <Normaltekst>Forventet antall barn</Normaltekst>
            <NumberSelector />
            <DateInput label="Fødselsdato" />
            <DialogBox type="warning">
                <Normaltekst>
                    Siden barnet ikke er født må du legge ved terminbekreftelse fra jordmor eller lege
                </Normaltekst>
            </DialogBox>
            <DateInput label="Terminbekreftelse utstedt" />
            <AttachmentList />
            <AttachmentButton />
        </div>
    </div>
);

export default Step2;
