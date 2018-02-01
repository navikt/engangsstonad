import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';

import { Normaltekst, Ingress, EtikettLiten } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import { confirmInformation, postEngangsstonadToApi } from 'actions';
import { fullNameFormat } from 'util/formats/index';
import CountryList from 'shared/country-picker/CountryList';
import PersonaliaLabel from 'shared/personalia-label/PersonaliaLabel';
import { ISODateToMaskedInput } from 'util/date';
import getMessage from '../../intl/util';

import '../engangsstonad.less';

// eslint-disable-next-line react/prefer-stateless-function

export class Step3 extends Component {
	constructor(props) {
		super(props);
		this.handleNextClicked = this.handleNextClicked.bind(this);
	}

	handleNextClicked(e) {
		e.preventDefault();
		const {
			childBorn,
			noOfChildren,
			termindato,
			bekreftetTermindato,
			residedInNorwayLastTwelveMonths,
			visits,
			workedInNorwayLastTwelveMonths,
			residingInNorwayNextTwelveMonths,
			residingInNorwayDuringBirth
		} = this.props;

		this.props.postEngangsstonadToApi({
			erBarnetFodt: childBorn,
			fodselsdato: undefined,
			antallBarn: noOfChildren,
			termindato,
			terminbekreftelseDato: bekreftetTermindato,
			boddINorgeSisteAar: residedInNorwayLastTwelveMonths,
			boddIUtlandetListe: visits,
			jobbetINorgeSisteTolvMnd: workedInNorwayLastTwelveMonths,
			skalBoINorgeNesteTolvMnd: residingInNorwayNextTwelveMonths,
			skalFodeINorge: residingInNorwayDuringBirth
		});
	}

	componentWillReceiveProps(props) {
		if (props.postReponse) {
			this.props.history.push('/engangsstonad/completed');
		}
	}

	createNumberOfChildrenSummaryString() {
		const { noOfChildren, intl } = this.props;
		switch (noOfChildren) {
			case 'tvillinger':
				return getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
			case 'flere':
				return getMessage(intl, 'relasjonBarn.radiobutton.flere');
			default:
				return getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
		}
	}

	renderRelasjonTilBarnSummary() {
		const { erBarnetFodt, termindato, terminbekreftelseDato, intl } = this.props;

		if (erBarnetFodt) {
			return (
				<div>
					<DisplayTextWithLabel
						label="Søknaden gjelder bla bla..."
						text="<fødselsdato her>"
					/>
				</div>
			);
		}

		return (
			<div>
				{erBarnetFodt === false && (
					<div>
						<DisplayTextWithLabel
							label={getMessage(intl, 'relasjonBarn.radiobutton.tvillinger')}
							text={this.createNumberOfChildrenSummaryString()}
						/>
						<DisplayTextWithLabel
							label={getMessage(intl, 'relasjonBarn.text.termindato')}
							text={ISODateToMaskedInput(termindato)}
						/>
						<DisplayTextWithLabel
							label={getMessage(intl,'oppsummering.text.vedlagtTerminbekreftelse')}
							text="<link til vedlegg her>"
						/>
						<DisplayTextWithLabel
							label={getMessage(intl,'oppsummering.text.vedlagtTerminbekreftelse')}
							text={ISODateToMaskedInput(terminbekreftelseDato)}
						/>
					</div>
				)}
			</div>
		);
	}

	renderTilknyningTilNorgeSummary() {
		const {
			boddINorgeSisteAar,
			boddIUtlandetListe,
			jobbetINorgeSisteTolvMnd,
			skalBoINorgeNesteTolvMnd,
			skalFodeINorge,
			intl
		} = this.props;

		const workedInNorwayLastYearText = jobbetINorgeSisteTolvMnd
			? getMessage(intl, 'medlemmskap.radiobutton.arbeidNorge')
			: getMessage(intl, 'medlemmskap.radiobutton.arbeidUtlandet');

		const resideInNorwayNextYearText = skalBoINorgeNesteTolvMnd
			? getMessage(intl, 'medlemmskap.radiobutton.boNorge')
			: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet');

		const residingInNorwayDuringBirthText = skalFodeINorge
			? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
			: getMessage(intl, 'medlemmskap.radioButton.vareUtlandet');

		return (
			<div>
				{boddINorgeSisteAar ? (
					<DisplayTextWithLabel
						label={getMessage(intl, 'oppsummering.text.boddSisteTolv')}
						text="Norge"
					/>
				) : (
					<div>
						<EtikettLiten className="textWithLabel__label">
							{getMessage(intl, 'oppsummering.text.boddSisteTolv')}
						</EtikettLiten>
						<CountryList visits={boddIUtlandetListe} type="oppsummering" />
					</div>
				)}

				<DisplayTextWithLabel
					label={getMessage(intl, 'medlemmskap.text.arbeid')}
					text={workedInNorwayLastYearText}
				/>
				<DisplayTextWithLabel
					label={getMessage(intl,'medlemmskap.text.neste12mnd')}
					text={resideInNorwayNextYearText}
				/>
				<DisplayTextWithLabel
					label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstispunktet')}
					text={residingInNorwayDuringBirthText}
				/>
			</div>
		);
	}

	render() {
		const { data, confirmedInformation, intl } = this.props;

		if (!data) {
			return null;
		}

		return (
			<div>
				<DocumentTitle title="NAV Engangsstønad - Oppsummering" />
				<DialogBox type="info">
					<Normaltekst>
						{getMessage(intl, 'oppsummering.text.lesNoye')}
					</Normaltekst>
				</DialogBox>
				<PersonaliaLabel
					navn={fullNameFormat(data.fornavn, data.mellomnavn, data.etternavn)}
					personnummer="XXXXXXXXXXX"
				/>

				<Ingress className="engangsstonadOppsumering__underTitle">
					{getMessage(intl, 'relasjonBarn.sectionheading.relasjonBarn')}
				</Ingress>
				{this.renderRelasjonTilBarnSummary()}

				<Ingress className="engangsstonadOppsumering__underTitle">
					{getMessage(intl, 'medlemmskap.sectionheading.medlemmskap')}
				</Ingress>
				{this.renderTilknyningTilNorgeSummary()}

				<ConfirmCheckbox
					name="bekreftOpplysninger"
					checked={this.props.confirmedInformation}
					onChange={this.props.confirmInformation}
					label={getMessage(intl, 'oppsummering.text.samtykke')}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleNextClicked}
						disabled={!confirmedInformation || this.props.isLoading}>
						{getMessage(intl, 'standard.sectionheading.sendSoknad')}
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

Step3.propTypes = {
	confirmInformation: PropTypes.func.isRequired,
	confirmedInformation: PropTypes.bool,
	data: PropTypes.shape({}),
	erBarnetFodt: PropTypes.bool.isRequired,
	antallBarn: PropTypes.string,
	termindato: PropTypes.string,
	terminbekreftelseDato: PropTypes.string,
	boddINorgeSisteAar: PropTypes.bool,
	boddIUtlandetListe: PropTypes.array,
	jobbetINorgeSisteTolvMnd: PropTypes.bool,
	skalBoINorgeNesteTolvMnd: PropTypes.bool,
	skalFodeINorge: PropTypes.bool,
	postEngangsstonadToApi: PropTypes.func.isRequired,
	postReponse: PropTypes.shape({}),
	isLoading: PropTypes.bool.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

Step3.defaultProps = {
	confirmedInformation: false,
	data: undefined,
	antallBarn: undefined,
	termindato: undefined,
	terminbekreftelseDato: undefined,
	boddINorgeSisteAar: undefined,
	boddIUtlandetListe: [],
	jobbetINorgeSisteTolvMnd: undefined,
	skalBoINorgeNesteTolvMnd: undefined,
	skalFodeINorge: undefined,
	postReponse: undefined
};

const mapStateToProps = (state) => ({
	confirmedInformation: state.engangsstonadReducer.confirmedInformation,
	data: state.engangsstonadReducer.data,
	erBarnetFodt: state.engangsstonadReducer.childBorn,
	antallBarn: state.engangsstonadReducer.noOfChildren,
	termindato: state.engangsstonadReducer.terminDato,
	terminbekreftelseDato: state.engangsstonadReducer.bekreftetTermindato,
	boddINorgeSisteAar: state.engangsstonadReducer.residedInNorwayLastTwelveMonths,
	boddIUtlandetListe: state.engangsstonadReducer.visits,
	jobbetINorgeSisteTolvMnd: state.engangsstonadReducer.workedInNorwayLastTwelveMonths,
	skalBoINorgeNesteTolvMnd: state.engangsstonadReducer.residingInNorwayNextTwelveMonths,
	skalFodeINorge: state.engangsstonadReducer.residingInNorwayDuringBirth,
	postReponse: state.engangsstonadReducer.postReponse,
	isLoading: state.engangsstonadReducer.isLoading
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			confirmInformation,
			postEngangsstonadToApi
		},
		dispatch
	)
});

const withIntl = injectIntl(Step3);
export default connect(mapStateToProps, mapDispatchToProps)(withIntl);
