import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../../components/shared/DialogBox';
import ElementWrapper from './../../../util/ElementWrapper';
import RadioGroupField from '../../../redux/form/components/RadioGroupField';
import RadioOption from '../../../redux/form/components/RadioOption';
import OpplysningPanel from '../../shared/OpplysningPanel';

import styles from './engangsstonad.step.less';

const radioData = [
    {
        label: 'Ja, jag vil heller søke om foreldrepenger.',
        value: 'foreldrepenger'
    },
    {
        label: `Nei, jeg vil gå videre med denne søknaden og forstår at jeg 
                mister retten til foreldrepenger hvis søknaden om engangsstønad blir innvilget.`,
        value: 'engangsstonad'
    }
];

const opplysningData = [
    {
        label: 'ARBEIDSGIVER',
        text: 'Nielsen Strikkfabrikk AS'
    },
    {
        label: 'STILLINGSPROSENT',
        text: '100 prosent fast'
    }
];

export const Step2 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>text</Normaltekst>
        </DialogBox>
        <OpplysningPanel
            iconKind="arbeidsgiver"
            title="Arbeid"
            opplysningData={opplysningData}
        />
        <RadioGroupField className={styles.radioGruppe} name="soknadstype">
            {radioData.map((data) => (
                <RadioOption label={data.label} value={data.value} />
            ))}
        </RadioGroupField>
    </ElementWrapper>
);
export default Step2;

