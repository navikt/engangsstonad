// @flow
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { Normaltekst } from 'nav-frontend-typografi';

import RadioGroupField from '../../../redux/form/components/RadioGroupField';
import RadioOption from '../../../redux/form/components/RadioOption';
import DateInput from '../../shared/date-input/DateInput';
import AttachmentButton from '../../shared/attachment-button/AttachmentButton';
import AttachmentList from '../../shared/attachment-list/AttachmentList';
import NumberSelector from '../../shared/number-selector/NumberSelector';
import DialogBox from '../../shared/dialog-box/DialogBox';

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

type Props = {
    childBorn: boolean
}

export const Step2 = (props: Props) => (
    <div className="engangsstonadStep2">
        <DialogBox type="info">
            <Normaltekst>Vi trenger mer informasjon fra deg om barnet eller barna søknaden gjelder</Normaltekst>
        </DialogBox>
        <RadioGroupField title="Er barnet født?" name="childBorn">
            {radioData.map((data) => (
                <RadioOption key={data.value} label={data.label} value={data.value} />
            ))}
        </RadioGroupField>
        {props.childBorn === 'false' &&
            <div className="step2ChildNotBornForm">
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
        }
    </div>
);

const selector = formValueSelector('engangsstonad');

export default connect((state) => ({
    childBorn: selector(state, 'childBorn')
}))(Step2);