import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import DialogBox from './../../shared/dialog-box/DialogBox';
import Modal from './../../shared/modal/Modal';


export const Step6 = () => (
    <div>
        <DialogBox type="success">
            <Normaltekst>
                Vi trenger mer informasjon fra deg om barnet eller barna som søknaden gjelder.
            </Normaltekst>
        </DialogBox>

        <Modal type="alert" title="Tenk på!">
            <Normaltekst>
            Hvis du ikke laster opp terminbekreftelsen nå så blir søknaden
            din satt på vent etter insendning ettersom vi ikke kan behandle den.
            </Normaltekst>
            <Element>Er du sikker på att du vill fortsette?</Element>
            <div>
                <Knapp>Nej</Knapp>
                <Knapp>ja</Knapp>
            </div>
        </Modal>

    </div>
);
export default Step6;
