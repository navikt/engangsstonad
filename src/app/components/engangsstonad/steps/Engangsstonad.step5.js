import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../../components/shared/DialogBox';
import ElementWrapper from '../../../util/ElementWrapper';

export const Step5 = () => (
    <ElementWrapper>
        <DialogBox type="success">
            <Normaltekst>
                Bra jobbet! Din søknad er nå sendt til NAV. Vi tar kontakt med deg hvis du trenger noe mer.
                DU kan finne status på din søknad på
            </Normaltekst>
            <Link to="/">Ditt NAV.</Link>
        </DialogBox>
    </ElementWrapper>
);

export default Step5;
