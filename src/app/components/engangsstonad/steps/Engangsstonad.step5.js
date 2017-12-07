import React from 'react';

import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import OpplysningPanel from '../../shared/opplysning-panel/OpplysningPanel';

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

const Step5 = () => ([
    <div className="step5">
        <AlertStripeNavAnsatt type="nav-ansatt">
            Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening
        </AlertStripeNavAnsatt>
        <OpplysningPanel
            title="Stønad"
            iconKind="stonad"
            opplysningData={opplysningData}
        />
    </div>
]);

export default Step5;
