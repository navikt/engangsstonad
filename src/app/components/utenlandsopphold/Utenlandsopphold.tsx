import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import CountryModal from '../../components/utenlandsopphold/utenlandsopphold-modal/UtenlandsoppholdModal';
import { CountryList } from '../../components/utenlandsopphold/UtenlandsoppholdList';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import LabelText from '../../../common/components/labeltekst/Labeltekst';
import { Tidsperiode } from 'nav-datovelger';
import { FormattedMessage } from 'react-intl';
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

interface State {
    isOpen: boolean;
    utenlandsoppholdToEdit?: Utenlandsopphold;
}

class CountryPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { isOpen: false };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addVisit = this.addVisit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    closeModal() {
        this.setState({ isOpen: false, utenlandsoppholdToEdit: undefined });
    }

    addVisit(utenlandsopphold: Utenlandsopphold) {
        this.props.addVisit(utenlandsopphold);
        this.setState({ isOpen: false });
    }

    onEditClick(utenlandsopphold: Utenlandsopphold) {
        this.setState({ utenlandsoppholdToEdit: utenlandsopphold, isOpen: true });
    }

    onDeleteClick(utenlandsopphold: Utenlandsopphold) {
        this.props.deleteVisit(utenlandsopphold);
    }

    onModalSubmit(utenlandsopphold: Utenlandsopphold) {
        const { utenlandsoppholdToEdit: editVisit } = this.state;
        if (editVisit === undefined) {
            this.props.addVisit(utenlandsopphold);
        } else {
            const updatedVisitIndex = this.props.utenlandsoppholdListe.indexOf(editVisit);
            this.props.editVisit(utenlandsopphold, updatedVisitIndex);
        }
        this.setState({ isOpen: false, utenlandsoppholdToEdit: undefined });
    }

    render() {
        const { utenlandsoppholdListe, gyldigTildsperiode, language } = this.props;
        return (
            <div>
                <div className="blokk-xs">{this.props.label && <LabelText>{this.props.label}</LabelText>}</div>
                {utenlandsoppholdListe.length > 0 && (
                    <div className="blokk-s">
                        <CountryList
                            utenlandsoppholdListe={utenlandsoppholdListe}
                            onEditClick={this.onEditClick}
                            onDeleteClick={this.onDeleteClick}
                        />
                    </div>
                )}
                {this.state.isOpen && (
                    <CountryModal
                        utenlandsopphold={this.state.utenlandsoppholdToEdit}
                        onSubmit={this.onModalSubmit}
                        closeModal={this.closeModal}
                        language={language}
                        alleUtenlandsopphold={utenlandsoppholdListe}
                        gyldigTidsperiode={gyldigTildsperiode}
                    />
                )}
                <Knapp className="countryPicker__addButton" onClick={() => this.openModal()} htmlType="button">
                    <FormattedMessage id="medlemmskap.knapp.leggTilLand" />
                </Knapp>
            </div>
        );
    }
}
export default CountryPicker;
