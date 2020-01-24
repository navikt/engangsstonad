import * as React from 'react';
const { Knapp } = require('nav-frontend-knapper');
import CountryModal from 'components/utenlandsopphold/utenlandsopphold-modal/UtenlandsoppholdModal';
import { CountryList } from 'components/utenlandsopphold/UtenlandsoppholdList';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import LabelText from 'common/components/labeltekst/Labeltekst';
import { Tidsperiode } from 'nav-datovelger';
import { FormattedMessage } from 'react-intl';
import { Language } from 'intl/IntlProvider';

import './utenlandsopphold.less';

interface Props {
    label: string;
    language: Language;
    utenlandsoppholdListe: Utenlandsopphold[];
    tidsperiode?: Tidsperiode;
    addVisit: (periode: Utenlandsopphold) => void;
    deleteVisit: (periode: Utenlandsopphold) => void;
    editVisit: (periode: Utenlandsopphold, index: number) => void;
}

interface State {
    isOpen: boolean;
    editVisit?: Utenlandsopphold;
}

class CountryPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const state: State = {
            isOpen: false
        };
        this.state = { ...state };
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
        this.setState({ isOpen: false, editVisit: undefined });
    }

    addVisit(periode: Utenlandsopphold) {
        this.props.addVisit(periode);
        this.setState({ isOpen: false });
    }

    onEditClick(periode: Utenlandsopphold) {
        this.setState({ editVisit: periode, isOpen: true });
    }

    onDeleteClick(periode: Utenlandsopphold) {
        this.props.deleteVisit(periode);
    }

    onModalSubmit(periode: Utenlandsopphold) {
        const { editVisit } = this.state;
        if (editVisit === undefined) {
            this.props.addVisit(periode);
        } else {
            const updatedVisitIndex = this.props.utenlandsoppholdListe.indexOf(editVisit);
            this.props.editVisit(periode, updatedVisitIndex);
        }
        this.setState({ isOpen: false, editVisit: undefined });
    }

    render() {
        const { utenlandsoppholdListe } = this.props;
        return (
            <div>
                <div className="blokk-xs">{this.props.label && <LabelText>{this.props.label}</LabelText>}</div>
                {this.props.utenlandsoppholdListe.length > 0 && (
                    <div className="blokk-s">
                        <CountryList
                            utenlandsoppholdListe={this.props.utenlandsoppholdListe}
                            onEditClick={(periode: Utenlandsopphold) => this.onEditClick(periode)}
                            onDeleteClick={(periode: Utenlandsopphold) => this.onDeleteClick(periode)}
                        />
                    </div>
                )}
                {this.state.isOpen && (
                    <CountryModal
                        utenlandsopphold={this.state.editVisit}
                        onSubmit={(periode: Utenlandsopphold) => this.onModalSubmit(periode)}
                        closeModal={() => this.closeModal()}
                        language={this.props.language}
                        label={this.props.label}
                        alleUtenlandsopphold={utenlandsoppholdListe}
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
