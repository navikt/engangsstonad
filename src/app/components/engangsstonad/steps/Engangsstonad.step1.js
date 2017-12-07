import React from 'react';

import { Undertittel, Element } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import IconWithText from '../../shared/icon-with-text/IconWithText';
import DisplayTextWithLabel from '../../shared/text-with-label/DisplayTextWithLabel';

const Step1 = () => (
    <div className="step1">
        <AlertStripe type="nav-ansatt">Her har vi noe info</AlertStripe>
        <IconWithText kind="arbeidsgiver" text="Placeholder" />
        <Undertittel>Placeholder</Undertittel>
        <Element>Placeholder</Element>
        <DisplayTextWithLabel label="Placeholder" text="Placeholder" />
        <Radio label="Placeholder" name="placeholder-gruppe" />
    </div>
);

export default Step1;
