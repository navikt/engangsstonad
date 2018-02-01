import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

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

import '../engangsstonad.less';

// eslint-disable-next-line react/prefer-stateless-function

export class Step4 extends Component {
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
			fodselsDato: undefined,
			antallBarn: noOfChildren,
			termindato,
			terminDatoBekreftelse: bekreftetTermindato,
			boddINorgeSisteAar: residedInNorwayLastTwelveMonths,
			BoddIUtlandetListe: visits,
			arbeidetINorgeSisteTolvMnd: workedInNorwayLastTwelveMonths,
			skalBoINorgeNesteTolvMnd: residingInNorwayNextTwelveMonths,
			skalFodeINorge: residingInNorwayDuringBirth
		});
	}

	componentWillReceiveProps(props) {
		if (props.postReponse) {
			this.props.history.push('/engangsstonad/completed');
		}
	}

	renderRelasjonTilBarnSummary() {
		const {
			childBorn,
			noOfChildren,
			termindato,
			bekreftetTermindato
		} = this.props;

		if (childBorn) {
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
				{childBorn === false && (
					<div>
						<DisplayTextWithLabel
							label="Søknaden gjelder..."
							text={noOfChildren}
						/>
						<DisplayTextWithLabel
							label="Med termindato den..."
							text={ISODateToMaskedInput(termindato)}
						/>
						<DisplayTextWithLabel
							label="Det er vedlagt en terminbekreftelse..."
							text="<link til vedlegg her>"
						/>
						<DisplayTextWithLabel
							label="Som er datert den..."
							text={ISODateToMaskedInput(bekreftetTermindato)}
						/>
					</div>
				)}
			</div>
		);
	}

	renderTilknyningTilNorgeSummary() {
		const {
			residedInNorwayLastTwelveMonths,
			visits,
			workedInNorwayLastTwelveMonths,
			residingInNorwayNextTwelveMonths,
			residingInNorwayDuringBirth
		} = this.props;

		const workedInNorwayLastYearText = workedInNorwayLastTwelveMonths
			? 'Kun jobbet i norge'
			: 'Kun jobbet i utlandet';

		const resideInNorwayNextYearText = residingInNorwayNextTwelveMonths
			? 'kun bo i norge'
			: 'bo i utlandet';

		const residingInNorwayDuringBirthText = residingInNorwayDuringBirth
			? 'være i Norge'
			: 'være i utlandet';

		return (
			<div>
				{residedInNorwayLastTwelveMonths ? (
					<DisplayTextWithLabel
						label="De siste månedene har jeg bodd i..."
						text="Norge"
					/>
				) : (
					<div>
						<EtikettLiten className="textWithLabel__label">
							De siste månedene har jeg bodd i...
						</EtikettLiten>
						<CountryList visits={visits} type="oppsummering" />
					</div>
				)}

				<DisplayTextWithLabel
					label="I denne perioden har jeg…"
					text={workedInNorwayLastYearText}
				/>
				<DisplayTextWithLabel
					label="De neste 12 månedene skal jeg…"
					text={resideInNorwayNextYearText}
				/>
				<DisplayTextWithLabel
					label="og kommer på fødselstidspunktet til å…"
					text={residingInNorwayDuringBirthText}
				/>
			</div>
		);
	}

	render() {
		const { data, confirmedInformation } = this.props;

		if (!data) {
			return null;
		}

		return (
			<div>
				<DocumentTitle title="NAV Engangsstønad - Oppsummering" />
				<DialogBox type="info">
					<Normaltekst>
						Les nøye gjennom oppsummeringen før du sender inn søknaden. Hvis du
						trenger å gjøre endringer kan du gå tilbake til tidligere steg
					</Normaltekst>
				</DialogBox>
				<PersonaliaLabel
					navn={fullNameFormat(data.fornavn, data.mellomnavn, data.etternavn)}
					personnummer="XXXXXXXXXXX"
				/>

				<Ingress className="engangsstonadOppsumering__underTitle">
					Relasjon til barn
				</Ingress>
				{this.renderRelasjonTilBarnSummary()}

				<Ingress className="engangsstonadOppsumering__underTitle">
					Tilknytning til Norge
				</Ingress>
				{this.renderTilknyningTilNorgeSummary()}

				<ConfirmCheckbox
					name="bekreftOpplysninger"
					checked={this.props.confirmedInformation}
					onChange={this.props.confirmInformation}
					label={`De opplysninger jeg har oppgitt er riktig og jeg har ikke holdt
							tilbake opplysninger som har betydning for min rett til engangsstønad.`}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleNextClicked}
						disabled={!confirmedInformation || this.props.isLoading}>
						Send søknad
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

Step4.propTypes = {
	confirmInformation: PropTypes.func.isRequired,
	confirmedInformation: PropTypes.bool,
	data: PropTypes.shape({}),
	childBorn: PropTypes.bool.isRequired,
	noOfChildren: PropTypes.string,
	termindato: PropTypes.string,
	bekreftetTermindato: PropTypes.string,
	residedInNorwayLastTwelveMonths: PropTypes.bool,
	visits: PropTypes.shape([]),
	workedInNorwayLastTwelveMonths: PropTypes.bool,
	residingInNorwayNextTwelveMonths: PropTypes.bool,
	residingInNorwayDuringBirth: PropTypes.bool,
	postEngangsstonadToApi: PropTypes.func.isRequired,
	postReponse: PropTypes.shape({}),
	isLoading: PropTypes.bool.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func
	}).isRequired
};

Step4.defaultProps = {
	confirmedInformation: false,
	data: undefined,
	noOfChildren: undefined,
	termindato: undefined,
	bekreftetTermindato: undefined,
	residedInNorwayLastTwelveMonths: undefined,
	visits: undefined,
	workedInNorwayLastTwelveMonths: undefined,
	residingInNorwayNextTwelveMonths: undefined,
	residingInNorwayDuringBirth: undefined,
	postReponse: undefined
};

const mapStateToProps = (state) => ({
	confirmedInformation: state.engangsstonadReducer.confirmedInformation,
	data: state.engangsstonadReducer.data,
	childBorn: state.engangsstonadReducer.childBorn,
	noOfChildren: state.engangsstonadReducer.noOfChildren,
	termindato: state.engangsstonadReducer.terminDato,
	bekreftetTermindato: state.engangsstonadReducer.bekreftetTermindato,
	residedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.residedInNorwayLastTwelveMonths,
	workedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.workedInNorwayLastTwelveMonths,
	residingInNorwayNextTwelveMonths:
		state.engangsstonadReducer.residingInNorwayNextTwelveMonths,
	residingInNorwayDuringBirth:
		state.engangsstonadReducer.residingInNorwayDuringBirth,
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

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
