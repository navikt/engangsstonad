import * as React from 'react';
const { Knapp } = require('nav-frontend-knapper');
const { Element } = require('nav-frontend-typografi');
const Modal = require('nav-frontend-modal').default;
import CountryModal from 'shared/country-picker/CountryModal';
import './countryPicker.less';
import { Utenlandsopphold } from '../../../types/domain/Medlemsskap';
import { CountryList } from 'shared/country-picker/CountryList';

interface Props {
    label: string;
    language: string;
    utenlandsoppholdListe: Utenlandsopphold[];
    addVisit: (utl: Utenlandsopphold) => void;
    deleteVisit: (utl: Utenlandsopphold) => void;
    editVisit: (utl: Utenlandsopphold, index: number) => void;
}

interface State {
    isOpen: boolean;
    editVisit?: Utenlandsopphold;
}

class CountryPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const state: State = {
            isOpen: false,
        };
        this.state = {...state};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addVisit = this.addVisit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
    }

    componentDidMount() {
        Modal.setAppElement('#app');
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    closeModal() {
        this.setState({ isOpen: false, editVisit: undefined });
    }

    addVisit(utenlandsopphold: Utenlandsopphold) {
        this.props.addVisit(utenlandsopphold);
        this.setState({ isOpen: false });
    }

    onEditClick(utenlandsopphold: Utenlandsopphold) {
        this.setState({ editVisit: utenlandsopphold, isOpen: true });
    }

    onDeleteClick(utenlandsopphold: Utenlandsopphold) {
        this.props.deleteVisit(utenlandsopphold);
    }

    onModalSubmit(utenlandsopphold: Utenlandsopphold) {
        const { editVisit } = this.state;
        if (editVisit === undefined) {
            this.props.addVisit(utenlandsopphold);
        } else {
            const updatedVisitIndex = this.props.utenlandsoppholdListe.indexOf(editVisit);
            this.props.editVisit(utenlandsopphold, updatedVisitIndex);
        }
        this.setState({ isOpen: false, editVisit: undefined });
    }

    render() {
        return (
            <div>
                {this.props.label && <Element>{this.props.label}</Element>}
                <CountryList
                    utenlandsoppholdListe={this.props.utenlandsoppholdListe}
                    onEditClick={(u: Utenlandsopphold) => this.onEditClick(u)}
                    onDeleteClick={(u: Utenlandsopphold) => this.onDeleteClick(u)}
                />
                {this.state.isOpen && (
                    <CountryModal
                        utenlandsopphold={this.state.editVisit}
                        onSubmit={(visit: Utenlandsopphold) => this.onModalSubmit(visit)}
                        closeModal={() => this.closeModal()}
                        language={this.props.language}
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
