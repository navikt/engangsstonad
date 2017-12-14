// @flow
import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';
import DialogBox from '../../shared/dialog-box/DialogBox';

const Step2 = () => (
    <div className="engangsstonadStep2">
        <DialogBox type="info">
            <Normaltekst>
                Vi trenger mer informasjon fra deg om barnet eller barna søknaden gjelder
            </Normaltekst>
        </DialogBox>
    </div>
);

export default Step2;
