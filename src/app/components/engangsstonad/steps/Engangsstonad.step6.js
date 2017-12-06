import React from 'react';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';

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
        <AlertStripeNavAnsatt
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
            Vi trenger å vite mer informasjon om fødselen som søknaden gjelder.
        </AlertStripeNavAnsatt>

        <RadioGroup
            className={styles.radioGruppe}
            title="Har fødselen allerede skjedd?"
            name="soknadstype"
            listOfRadioData={radioData}
        />


        <NumberSelector />
        <DateInput />

        <AttachmentList />
        <AttachmentButton />

    </ElementWrapper>
);
export default Step6;
