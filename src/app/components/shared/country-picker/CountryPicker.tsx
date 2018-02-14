import * as React from 'react';
const { Hovedknapp } = require('nav-frontend-knapper');
const { Element } = require('nav-frontend-typografi');
const Modal = require('nav-frontend-modal').default;
import CountryList from 'shared/country-picker/CountryList';
import CountryModal from 'shared/country-picker/CountryModal';
import { utlandsopphold } from './types';
import './countryPicker.less';

interface Props {
    label: string;
    language: string;
    visits: utlandsopphold[];
    addVisit: (utl: utlandsopphold) => void;
    deleteVisit: (utl: utlandsopphold) => void;
    editVisit: (utl: utlandsopphold, index: number) => void;
}

interface State {
    isOpen: boolean;
    editVisit?: utlandsopphold;
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

    addVisit(visit: utlandsopphold) {
        this.props.addVisit(visit);
        this.setState({ isOpen: false });
    }

    onEditClick(visit: utlandsopphold) {
        this.setState({ editVisit: visit, isOpen: true });
    }

    onDeleteClick(visit: utlandsopphold) {
        this.props.deleteVisit(visit);
    }

    onModalSubmit(visit: utlandsopphold) {
        const { editVisit } = this.state;
        if (editVisit === undefined) {
            this.props.addVisit(visit);
        } else {
            const updatedVisitIndex = this.props.visits.indexOf(editVisit);
            this.props.editVisit(visit, updatedVisitIndex);
        }
        this.setState({ isOpen: false, editVisit: undefined });
    }

    render() {
        return (
            <div>
                {this.props.label && <Element>{this.props.label}</Element>}
                <CountryList
                    visits={this.props.visits}
                    onEditClick={(e: utlandsopphold) => this.onEditClick(e)}
                    onDeleteClick={(e: utlandsopphold) => this.onDeleteClick(e)}
                />
                {this.state.isOpen && (
                    <CountryModal
                        visit={this.state.editVisit}
                        onSubmit={(visit: utlandsopphold) => this.onModalSubmit(visit)}
                        closeModal={() => this.closeModal()}
                        language={this.props.language}
                    />
                )}
                <Hovedknapp
                    className="countryPicker__addButton"
                    onClick={() => this.openModal()}
                >
                    Legg til land
                </Hovedknapp>
            </div>
        );
    }
}
export default CountryPicker;
