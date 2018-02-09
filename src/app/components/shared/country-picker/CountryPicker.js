import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import CountryList from 'shared/country-picker/CountryList';
import CountryModal from 'shared/country-picker/CountryModal';

import './countryPicker.less';

class CountryPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			editVisit: null
		};
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
		this.setState({ isOpen: false, editVisit: null });
	}

	addVisit(visit) {
		this.props.addVisit(visit);
		this.setState({ isOpen: false });
	}

	onEditClick(visit) {
		this.setState({ editVisit: visit, isOpen: true });
	}

	onDeleteClick(visit) {
		this.props.deleteVisit(visit);
	}

	onModalSubmit(visit) {
		const { editVisit } = this.state;
		if (editVisit === null) {
			this.props.addVisit(visit);
		} else {
			const updatedVisitIndex = this.props.visits.indexOf(editVisit);
			this.props.editVisit(visit, updatedVisitIndex);
		}
		this.setState({ isOpen: false, editVisit: null });
	}

	render() {
		return (
			<div>
				{this.props.label && <Element>{this.props.label}</Element>}
				<CountryList
					visits={this.props.visits}
					onEditClick={(e) => this.onEditClick(e)}
					onDeleteClick={(e) => this.onDeleteClick(e)}
				/>
				{this.state.isOpen && (
					<CountryModal
						visit={this.state.editVisit}
						onSubmit={(visit) => this.onModalSubmit(visit)}
						closeModal={() => this.closeModal()}
						language={this.props.language}
					/>
				)}
				<Knapp
					className="countryPicker__addButton"
					htmlType="button"
					onClick={() => this.openModal()}>
					Legg til land
				</Knapp>
			</div>
		);
	}
}
CountryPicker.propTypes = {
	label: PropTypes.string,
	addVisit: PropTypes.func.isRequired,
	deleteVisit: PropTypes.func.isRequired,
	editVisit: PropTypes.func.isRequired,
	visits: PropTypes.arrayOf(
		PropTypes.shape({
			land: PropTypes.string,
			startDato: PropTypes.string,
			sluttDato: PropTypes.string
		})
	).isRequired,
	language: PropTypes.string.isRequired
};

CountryPicker.defaultProps = {
	label: undefined
};
export default CountryPicker;
