import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { Tidsperiode } from 'nav-datovelger';

import CountryModal from '../../components/utenlandsopphold/utenlandsopphold-modal/UtenlandsoppholdModal';
import { CountryList } from './utenlandsopphold-list/UtenlandsoppholdList';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import { Language } from '../../intl/IntlProvider';

import './utenlandsopphold.less';

interface Props {
    label: React.ReactNode;
    language: Language;
    utenlandsoppholdListe: Utenlandsopphold[];
    gyldigTildsperiode?: Tidsperiode;
    addVisit: (periode: Utenlandsopphold) => void;
    deleteVisit: (periode: Utenlandsopphold) => void;
    editVisit: (periode: Utenlandsopphold, index: number) => void;
}

const CountryPicker: React.FunctionComponent<Props> = ({
    label,
    utenlandsoppholdListe,
    gyldigTildsperiode,
    language,
    addVisit,
    editVisit,
    deleteVisit
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [utenlandsoppholdToEdit, setUtenlandsoppholdToEdit] = React.useState<Utenlandsopphold | undefined>(undefined);

    const closeModal = () => {
        setIsOpen(false);
        setUtenlandsoppholdToEdit(undefined);
    };

    const onEditClick = (utenlandsopphold: Utenlandsopphold) => {
        setIsOpen(true);
        setUtenlandsoppholdToEdit(utenlandsopphold);
    };

    const onModalSubmit = (utenlandsopphold: Utenlandsopphold) => {
        closeModal();
        utenlandsoppholdToEdit
            ? editVisit(utenlandsopphold, utenlandsoppholdListe.indexOf(utenlandsoppholdToEdit))
            : addVisit(utenlandsopphold);
    };

    return (
        <>
            <div className="blokk-s">
                <CountryList
                    utenlandsoppholdListe={utenlandsoppholdListe}
                    onEditClick={onEditClick}
                    onDeleteClick={deleteVisit}
                />
            </div>

            <Knapp onClick={() => setIsOpen(true)} htmlType="button">
                <FormattedMessage id="medlemmskap.knapp.leggTilLand" />
            </Knapp>

            {isOpen && (
                <CountryModal
                    utenlandsopphold={utenlandsoppholdToEdit}
                    onSubmit={onModalSubmit}
                    closeModal={closeModal}
                    alleUtenlandsopphold={utenlandsoppholdListe.filter((u) => u !== utenlandsoppholdToEdit)}
                    gyldigTidsperiode={gyldigTildsperiode}
                    language={language}
                />
            )}
        </>
    );
};
export default CountryPicker;
