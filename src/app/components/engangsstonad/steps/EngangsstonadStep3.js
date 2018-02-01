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

	renderRelasjonTilBarnSummary() {
		const {
			childBorn,
			noOfChildren,
			termindato,
			bekreftetTermindato,
			intl
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

		let noOfChildrenText;
		switch (noOfChildren) {
			case 'tvillinger':
				noOfChildrenText = intl.formatMessage({
					id: 'relasjonBarn.radiobutton.tvillinger'
				});
				break;
			case 'flere':
				noOfChildrenText = intl.formatMessage({
					id: 'relasjonBarn.radiobutton.flere'
				});
				break;
			default:
				noOfChildrenText = intl.formatMessage({
					id: 'relasjonBarn.radiobutton.ettbarn'
				});
				break;
		}

		return (
			<div>
				{childBorn === false && (
					<div>
						<DisplayTextWithLabel
							label={intl.formatMessage({
								id: 'oppsummering.text.soknadenGjelder'
							})}
							text={noOfChildrenText}
						/>
						<DisplayTextWithLabel
							label={intl.formatMessage({
								id: 'relasjonBarn.text.termindato'
							})}
							text={ISODateToMaskedInput(termindato)}
						/>
						<DisplayTextWithLabel
							label={intl.formatMessage({
								id: 'oppsummering.text.vedlagtTerminbekreftelse'
							})}
							text="<link til vedlegg her>"
						/>
						<DisplayTextWithLabel
							label={intl.formatMessage({
								id: 'oppsummering.text.somErDatert'
							})}
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
			residingInNorwayDuringBirth,
			intl
		} = this.props;

		const workedInNorwayLastYearText = workedInNorwayLastTwelveMonths
			? intl.formatMessage({ id: 'medlemmskap.radiobutton.arbeidNorge' })
			: intl.formatMessage({ id: 'medlemmskap.radiobutton.arbeidUtlandet' });

		const resideInNorwayNextYearText = residingInNorwayNextTwelveMonths
			? intl.formatMessage({ id: 'medlemmskap.radiobutton.boNorge' })
			: intl.formatMessage({ id: 'medlemmskap.radiobutton.boUtlandet' });

		const residingInNorwayDuringBirthText = residingInNorwayDuringBirth
			? intl.formatMessage({ id: 'medlemmskap.radiobutton.vareNorge' })
			: intl.formatMessage({ id: 'medlemmskap.radioButton.vareUtlandet' });

		return (
			<div>
				{residedInNorwayLastTwelveMonths ? (
					<DisplayTextWithLabel
						label={intl.formatMessage({
							id: 'oppsummering.text.boddSisteTolv'
						})}
						text="Norge"
					/>
				) : (
					<div>
						<EtikettLiten className="textWithLabel__label">
							{intl.formatMessage({ id: 'oppsummering.text.boddSisteTolv' })}
						</EtikettLiten>
						<CountryList visits={visits} type="oppsummering" />
					</div>
				)}

				<DisplayTextWithLabel
					label={intl.formatMessage({
						id: 'medlemmskap.text.arbeid'
					})}
					text={workedInNorwayLastYearText}
				/>
				<DisplayTextWithLabel
					label={intl.formatMessage({
						id: 'medlemmskap.text.neste12mnd'
					})}
					text={resideInNorwayNextYearText}
				/>
				<DisplayTextWithLabel
					label={intl.formatMessage({
						id: 'oppsummering.text.ogKommerPåFødselstispunktet'
					})}
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
						{intl.formatMessage({ id: 'oppsummering.text.lesNoye' })}
					</Normaltekst>
				</DialogBox>
				<PersonaliaLabel
					navn={fullNameFormat(data.fornavn, data.mellomnavn, data.etternavn)}
					personnummer="XXXXXXXXXXX"
				/>

				<Ingress className="engangsstonadOppsumering__underTitle">
					{intl.formatMessage({
						id: 'relasjonBarn.sectionheading.relasjonBarn'
					})}
				</Ingress>
				{this.renderRelasjonTilBarnSummary()}

				<Ingress className="engangsstonadOppsumering__underTitle">
					{intl.formatMessage({
						id: 'medlemmskap.sectionheading.medlemmskap'
					})}
				</Ingress>
				{this.renderTilknyningTilNorgeSummary()}

				<ConfirmCheckbox
					name="bekreftOpplysninger"
					checked={this.props.confirmedInformation}
					onChange={this.props.confirmInformation}
					label={intl.formatMessage({ id: 'oppsummering.text.samtykke' })}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleNextClicked}
						disabled={!confirmedInformation || this.props.isLoading}>
						{intl.formatMessage({ id: 'standard.sectionheading.sendSoknad' })}
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
	childBorn: PropTypes.bool.isRequired,
	noOfChildren: PropTypes.string,
	termindato: PropTypes.string,
	bekreftetTermindato: PropTypes.string,
	residedInNorwayLastTwelveMonths: PropTypes.bool,
	visits: PropTypes.array,
	workedInNorwayLastTwelveMonths: PropTypes.bool,
	residingInNorwayNextTwelveMonths: PropTypes.bool,
	residingInNorwayDuringBirth: PropTypes.bool,
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
	noOfChildren: undefined,
	termindato: undefined,
	bekreftetTermindato: undefined,
	residedInNorwayLastTwelveMonths: undefined,
	visits: [],
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
	visits: state.engangsstonadReducer.visits,
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

const withIntl = injectIntl(Step3);
export default connect(mapStateToProps, mapDispatchToProps)(withIntl);
