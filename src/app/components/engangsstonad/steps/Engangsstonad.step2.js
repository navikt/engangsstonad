import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';

import RadioGroup from '../../shared/radio-group/RadioGroup';
import OpplysningPanel from '../../shared/opplysning-panel/OpplysningPanel';

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

const Step2 = () => (
    <div className="step2">
        <AlertStripe type="nav-ansatt">
            Dersom du har /haft arbeid/likestilt inntekt så kan du ha rett på foreldrepenger.
        </AlertStripe>
        <OpplysningPanel
            iconKind="arbeidsgiver"
            title="Arbeid"
            opplysningData={opplysningData}
        />
        <RadioGroup name="soknadstype" listOfRadioData={radioData} />
    </div>
);

export default Step2;
