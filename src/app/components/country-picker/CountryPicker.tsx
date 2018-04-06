import * as React from 'react';
const { Knapp } = require('nav-frontend-knapper');
import CountryModal from 'components/country-picker/CountryModal';
import { CountryList } from 'components/country-picker/CountryList';
import { Periode } from '../../types/domain/Utenlandsopphold';
import './countryPicker.less';
import Labeltekst from 'components/labeltekst/Labeltekst';
import { Tidsperiode } from 'datovelger';

interface Props {
    label: string;
    language: string;
    utenlandsoppholdListe: Periode[];
    tidsperiode?: Tidsperiode;
    addVisit: (periode: Periode) => void;
    deleteVisit: (periode: Periode) => void;
    editVisit: (periode: Periode, index: number) => void;
}

interface State {
    isOpen: boolean;
    editVisit?: Periode;
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

    addVisit(periode: Periode) {
        this.props.addVisit(periode);
        this.setState({ isOpen: false });
    }

    onEditClick(periode: Periode) {
        this.setState({ editVisit: periode, isOpen: true });
    }

    onDeleteClick(periode: Periode) {
        this.props.deleteVisit(periode);
    }

    onModalSubmit(periode: Periode) {
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
        return (
            <div>
                {this.props.label && <Labeltekst>{this.props.label}</Labeltekst>}
                <CountryList
                    utenlandsoppholdListe={this.props.utenlandsoppholdListe}
                    onEditClick={(periode: Periode) => this.onEditClick(periode)}
                    onDeleteClick={(periode: Periode) => this.onDeleteClick(periode)}
                />
                {this.state.isOpen && (
                    <CountryModal
                        utenlandsopphold={this.state.editVisit}
                        onSubmit={(periode: Periode) => this.onModalSubmit(periode)}
                        closeModal={() => this.closeModal()}
                        language={this.props.language}
                        label={this.props.label}
                        tidsperiode={this.props.tidsperiode}
                    />
                )}
                <Knapp className="countryPicker__addButton" onClick={() => this.openModal()} htmlType="button">
                    Legg til land
                </Knapp>
            </div>
        );
    }
}
export default CountryPicker;
