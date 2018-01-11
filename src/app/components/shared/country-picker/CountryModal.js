import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'nav-frontend-skjema';
import { Undertittel, Element } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import DateInput from 'shared/date-input/DateInput';
import { Knapp } from 'nav-frontend-knapper';

const selectOptions = ['Marshalløyene', 'Argentina', 'Kina'];

const renderSelectOptions = (selectOption) =>
	selectOption.map((optionValue) => (
		<option key={optionValue} value={optionValue}>
			{optionValue}
		</option>
	));

class CountryModal extends Component {
	constructor(props) {
		super(props);
		if (props.visit) {
			this.state = {
				titleText: 'Endre utenlandsopphold',
				submitButtonText: 'Lagre endringer',
				...props.visit
			};
		} else {
			this.state = {
				titleText: 'Legg til utenlandsopphold',
				submitButtonText: 'Legg til land',
				country: '',
				startDate: '',
				endDate: ''
			};
		}
	}

	onSubmit() {
		const visit = {
			country: this.state.country,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};
		this.props.onSubmit(visit);
	}

	render() {
		return (
			<Modal
				isOpen
				contentLabel="test"
				closeButton={false}
				onRequestClose={() => {
					this.props.closeModal();
				}}>
				<div>
					<Undertittel className="countryModal__title">
						{this.state.titleText}
					</Undertittel>
					<Element>Jeg bodde i...</Element>
					<Select
						onChange={(e) => this.setState({ country: e.target.value })}
						label=""
						defaultValue={this.state.country}>
						<option value="" />
						{selectOptions && renderSelectOptions(selectOptions)}
					</Select>
					<DateInput
						id="termindato"
						input={{ value: this.state.startDate }}
						label="fra"
						onChange={(date) => this.setState({ startDate: date })}
						errorMessage=""
					/>
					<DateInput
						id="fra dato"
						label="til"
						input={{ value: this.state.endDate }}
						onChange={(date) => this.setState({ endDate: date })}
						errorMessage=""
					/>
					<Knapp onClick={() => this.props.closeModal()}>Avbryt</Knapp>
					<Knapp onClick={() => this.onSubmit()}>
						{this.state.submitButtonText}
					</Knapp>
				</div>
			</Modal>
		);
	}
}

CountryModal.propTypes = {
	visit: PropTypes.shape({
		country: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string
	}),
	closeModal: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

CountryModal.defaultProps = {
	visit: {
		country: '',
		startDate: '',
		endDate: ''
	}
};
export default CountryModal;
