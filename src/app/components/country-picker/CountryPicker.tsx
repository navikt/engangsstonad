import React, { useState } from 'react';
const { Knapp } = require('nav-frontend-knapper');
import CountryModal from 'components/country-picker/CountryModal';
import { CountryList } from 'components/country-picker/CountryList';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import LabelText from 'common/components/labeltekst/Labeltekst';
import { Tidsperiode } from 'nav-datovelger';
import { Feil } from 'components/skjema-input-element/types';
import { FormattedMessage } from 'react-intl';
import { Språkkode } from 'intl/types';

import './countryPicker.less';

interface Validators {
    validateLand: (data: any) => Feil | undefined;
    validateFom: (data: any) => Feil | undefined;
    validateTom: (data: any) => Feil | undefined;
}

interface Props {
    label: string;
    språkkode: Språkkode;
    utenlandsoppholdListe: Utenlandsopphold[];
    tidsperiode?: Tidsperiode;
    addVisit: (periode: Utenlandsopphold) => void;
    deleteVisit: (periode: Utenlandsopphold) => void;
    editVisit: (periode: Utenlandsopphold, index: number) => void;
    validators?: Validators;
}

const CountryPicker: React.FunctionComponent<Props> = ({
    label,
    språkkode,
    utenlandsoppholdListe,
    tidsperiode,
    addVisit,
    deleteVisit,
    editVisit,
    validators,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedVisit, setselectedVisit] = useState<Utenlandsopphold | undefined>();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setselectedVisit(undefined);
    };

    const handleAddVisit = (periode: Utenlandsopphold) => {
        addVisit(periode);
        setIsOpen(false);
    };

    const onEditClick = (periode: Utenlandsopphold) => {
        setselectedVisit(periode);
        setIsOpen(true);
    };

    const onDeleteClick = (periode: Utenlandsopphold) => {
        deleteVisit(periode);
    };

    const onModalSubmit = (periode: Utenlandsopphold) => {
        if (selectedVisit === undefined) {
            handleAddVisit(periode);
        } else {
            const updatedVisitIndex = utenlandsoppholdListe.indexOf(selectedVisit);
            editVisit(periode, updatedVisitIndex);
        }
        setIsOpen(false);
        setselectedVisit(undefined);
    };

    return (
        <div>
            <div className="blokk-xs">{label && <LabelText>{label}</LabelText>}</div>
            {utenlandsoppholdListe.length > 0 && (
                <div className="blokk-s">
                    <CountryList
                        utenlandsoppholdListe={utenlandsoppholdListe}
                        onEditClick={(periode: Utenlandsopphold) => onEditClick(periode)}
                        onDeleteClick={(periode: Utenlandsopphold) => onDeleteClick(periode)}
                    />
                </div>
            )}
            {isOpen && (
                <CountryModal
                    utenlandsopphold={selectedVisit}
                    onSubmit={(periode: Utenlandsopphold) => onModalSubmit(periode)}
                    closeModal={() => closeModal()}
                    språkkode={språkkode}
                    label={label}
                    tidsperiode={tidsperiode}
                    alleUtenlandsopphold={utenlandsoppholdListe}
                    {...validators}
                />
            )}
            <Knapp className="countryPicker__addButton" onClick={() => openModal()} htmlType="button">
                <FormattedMessage id="medlemmskap.knapp.leggTilLand" />
            </Knapp>
        </div>
    );
};
export default CountryPicker;
