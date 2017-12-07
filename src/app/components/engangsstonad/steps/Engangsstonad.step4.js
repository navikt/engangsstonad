import React from 'react';

import { Undertittel } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';

import CheckboxWithLine from '../../shared/checkbox-with-line/CheckboxWithLine';

const checkboxData = [
    {
        label: 'NAVN',
        text: 'Lise Haugdahl'
    },
    {
        label: 'FØDSELSNUMMER',
        text: '01111799999'
    }
];

const Step4 = () => (
    <div className="step4">
        <AlertStripe type="nav-ansatt">
            Vi har funnet opplysninger om barn som du er forelder til
        </AlertStripe>
        <Undertittel>Gjelder søknaden dette barnet?</Undertittel>
        <CheckboxWithLine content={checkboxData} />
        <CheckboxWithLine content={checkboxData} />
    </div>
);

export default Step4;
