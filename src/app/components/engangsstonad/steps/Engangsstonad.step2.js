import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';

import ElementWrapper from './../../../util/ElementWrapper';
import RadioGroup from '../../shared/RadioGroup';
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
        <AlertStripe
            className={styles.marginBottomLarge}
            type="nav-ansatt"
        >
            Dersom du har /haft arbeid/likestilt inntekt så kan du ha rett på foreldrepenger.
        </AlertStripe>
        <OpplysningPanel
            iconKind="arbeidsgiver"
            title="Arbeid"
            opplysningData={opplysningData}
        />
        <RadioGroup className={styles.radioGruppe} name="soknadstype" listOfRadioData={radioData} />
    </ElementWrapper>
);
export default Step2;

