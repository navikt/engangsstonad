// @flow
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { Normaltekst } from 'nav-frontend-typografi';

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

const Step2 = (props: Props) => (
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
            <div>
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
            </div>
        }
    </div>
);

const selector = formValueSelector('engangsstonad');

export default connect((state) => ({
    childBorn: selector(state, 'childBorn')
}))(Step2);
