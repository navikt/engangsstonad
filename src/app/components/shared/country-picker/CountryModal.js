import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import bokmalCountryList from 'i18n-iso-countries/langs/nb.json';
import nynorskCountryList from 'i18n-iso-countries/langs/nn.json';

import { Select } from 'nav-frontend-skjema';
import { Undertittel, Element } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';

import DateInput from 'shared/date-input/DateInput';
import getMessage from '../../../util/i18n/index';

class CountryModal extends Component {
	constructor(props) {
		super(props);
		const contriesLanguage =
			props.language === 'nb' ? bokmalCountryList : nynorskCountryList;
		countries.registerLocale(contriesLanguage);
		const { intl } = props;
		if (props.visit) {
			this.state = {
				titleText: getMessage(intl, 'medlemmskap.landvelger.endre'),
				submitButtonText: getMessage(intl, 'medlemmskap.landvelger.lagre'),
				...props.visit
			};
		} else {
			this.state = {
				titleText: getMessage(intl, 'medlemmskap.landvelger.leggTil'),
				submitButtonText: getMessage(intl, 'medlemmskap.landvelger.leggTilLand')
			};
		}
	}

	renderSelectOptions() {
		const { language } = this.props;
		return Object.entries(countries.getNames(language))
			.sort((a, b) => a[1].localeCompare(b[1], language))
			.map((optionValue) => (
				<option key={optionValue[0]} value={optionValue[0]}>
					{optionValue[1]}
				</option>
			));
	}

	onSubmit() {
		const visit = {
			land: this.state.land,
			startDato: this.state.startDato,
			sluttDato: this.state.sluttDato
		};
		this.props.onSubmit(visit);
	}

	render() {
		const { intl } = this.props;
		return (
			<Modal
				isOpen
				contentLabel="landvelger"
				closeButton={false}
				onRequestClose={() => {
					this.props.closeModal();
				}}>
				<div>
					<Undertittel className="countryModal__title">
						{this.state.titleText}
					</Undertittel>
					<Element>{getMessage(intl, 'medlemmskap.text.jegBodde')}</Element>
					<Select
						label=""
						onChange={(e) => this.setState({ land: e.target.value })}
						defaultValue={this.state.land}>
						<option value="" />
						{this.renderSelectOptions()}
					</Select>
					<DateInput
						id="boddFraDato"
						input={{ value: this.state.startDato }}
						label="fra"
						onChange={(date) => this.setState({ startDato: date })}
						errorMessage=""
					/>
					<DateInput
						id="boddTilDato"
						label="til"
						input={{ value: this.state.sluttDato }}
						onChange={(date) => this.setState({ sluttDato: date })}
						errorMessage=""
					/>
					<Knapp onClick={() => this.props.closeModal()}>
						{getMessage(intl, 'medlemmskap.landvelger.avbryt')}
					</Knapp>
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
		land: PropTypes.string,
		startDato: PropTypes.string,
		sluttDato: PropTypes.string
	}),
	closeModal: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	language: PropTypes.string.isRequired,
	intl: intlShape.isRequired
};

CountryModal.defaultProps = {
	visit: {
		land: '',
		startDato: '',
		sluttDato: ''
	}
};
export default injectIntl(CountryModal);
