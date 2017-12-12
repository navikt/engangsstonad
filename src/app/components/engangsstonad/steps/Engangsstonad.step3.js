import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../shared/dialog-box/DialogBox';
import IconWithText from '../../shared/icon-with-text/IconWithText';
import RadioGroup from './../../shared/radio-group/RadioGroup';

export const Step3 = () => (
    <div>
        <DialogBox type="info">
            <Normaltekst>
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge
            </Normaltekst>
        </DialogBox>

        <IconWithText kind="arbeidsgiver" text="Adresse" />

        <Normaltekst>Stockholmsgata 16B</Normaltekst>
        <Normaltekst>0566, Oslo</Normaltekst>
        <Normaltekst>Norge</Normaltekst>
        <RadioGroup
            title="Har du oppholdt deg i Norge de siste 12 månedene?"
            name="oppholdSisteAr"
            listOfRadioData={[
                {
                    label: 'Ja',
                    value: 'ja'
                },
                {
                    label: 'Nei',
                    value: 'nei'
                }
            ]}
        />
        <RadioGroup
            title="Oppholder du deg for tiden i Norge?"
            name="oppholdNavarende"
            listOfRadioData={[
                {
                    label: 'Ja',
                    value: 'ja'
                },
                {
                    label: 'Nei',
                    value: 'nei'
                }
            ]}
        />
        <RadioGroup
            title="Skal du oppholde deg i Norge de neste 12 månedene?"
            name="oppholdNesteAr"
            listOfRadioData={[
                {
                    label: 'Ja',
                    value: 'ja'
                },
                {
                    label: 'Nei',
                    value: 'nei'
                }
            ]}
        />
    </div>
);

export default Step3;
