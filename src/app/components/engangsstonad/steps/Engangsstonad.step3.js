import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../../components/shared/DialogBox';
import IconWithText from './../../shared/IconWithText';
import RadioGroup from './../../shared/radio-group/RadioGroup';

import ElementWrapper from '../../../util/ElementWrapper';

import styles from './engangsstonad.step.less';

export const Step3 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge
            </Normaltekst>
        </DialogBox>

        <IconWithText kind="arbeidsgiver" text="Adresse" />
        <Normaltekst className={styles.marginTop}>Stockholmsgata 16B</Normaltekst>
        <Normaltekst className={styles.marginTop}>0566, Oslo</Normaltekst>
        <Normaltekst className={styles.marginTopBottom}>Norge</Normaltekst>
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
    </ElementWrapper>
);

export default Step3;
