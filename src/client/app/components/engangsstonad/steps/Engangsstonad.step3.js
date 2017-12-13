import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../shared/dialog-box/DialogBox';

export const Step3 = () => (
    <div>
        <DialogBox type="info">
            <Normaltekst>
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge.
            </Normaltekst>
            <Normaltekst>
                Tenk på at korte ferier i utlandet ikke regnes som opphold
                i utlandet.
            </Normaltekst>
        </DialogBox>
    </div>
);

export default Step3;
