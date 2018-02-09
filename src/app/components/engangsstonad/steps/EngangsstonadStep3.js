import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';

import { Normaltekst, Ingress, EtikettLiten } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import { fullNameFormat } from 'util/formats/index';
import CountryList from 'shared/country-picker/CountryList';
import PersonaliaLabel from 'shared/personalia-label/PersonaliaLabel';
import { ISODateToMaskedInput } from 'util/date';
import {
	apiActionCreators as api,
	commonActionCreators as common
} from '../../../redux-ts/actions';
import getMessage from '../../../util/i18n';

import '../engangsstonad.less';

export class Step3 extends Component {
	constructor(props) {
		super(props);
		this.handleNextClicked = this.handleNextClicked.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(api.getPerson());
	}

	componentWillReceiveProps(props) {
		if (props.soknad) {
			this.props.history.push('/engangsstonad/completed');
		}
	}

	handleNextClicked(e) {
		e.preventDefault();
		const { dispatch, medlemsskap, relasjonTilBarn } = this.props;
		dispatch(api.sendSoknad({ medlemsskap, relasjonTilBarn }));
	}

	antallBarnSummary() {
		const { intl } = this.props;
		const { antallBarn } = this.props.relasjonTilBarn;

		if (antallBarn === 1) {
			return getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
		} else if (antallBarn === 2) {
			return getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
		}
		return getMessage(intl, 'relasjonBarn.radiobutton.flere');
	}

	renderRelasjonTilBarnSummary() {
		const { intl, barnErFodt } = this.props;
		const { fodselsdato, terminDato, utstedtDato } = this.props.relasjonTilBarn;

		if (barnErFodt) {
			return (
				<DisplayTextWithLabel
					label="Søknaden gjelder bla bla..."
					text={fodselsdato}
				/>
			);
		}

		return (
			<div>
				{!barnErFodt && (
					<div>
						<DisplayTextWithLabel
							label={getMessage(intl, 'relasjonBarn.radiobutton.tvillinger')}
							text={this.antallBarnSummary()}
						/>,
						<DisplayTextWithLabel
							label={getMessage(intl, 'relasjonBarn.text.termindato')}
							text={ISODateToMaskedInput(terminDato)}
						/>,
						<DisplayTextWithLabel
							label={getMessage(
								intl,
								'oppsummering.text.vedlagtTerminbekreftelse'
							)}
							text="<link til vedlegg her>"
						/>,
						<DisplayTextWithLabel
							label={getMessage(
								intl,
								'oppsummering.text.vedlagtTerminbekreftelse'
							)}
							text={ISODateToMaskedInput(utstedtDato)}
						/>
					</div>
				)}
			</div>
		);
	}

	renderMedlemsskapSummary() {
		const { intl } = this.props;
		const {
			fodselINorge,
			iNorgeNeste12,
			iNorgeSiste12,
			utenlandsopphold
		} = this.props.medlemsskap;

		const iNorgeNeste12Text = iNorgeNeste12
			? getMessage(intl, 'medlemmskap.radiobutton.boNorge')
			: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet');

		const fodselINorgeText = fodselINorge
			? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
			: getMessage(intl, 'medlemmskap.radioButton.vareUtlandet');

		return (
			<div>
				{iNorgeSiste12 ? (
					<DisplayTextWithLabel
						label={getMessage(intl, 'oppsummering.text.boddSisteTolv')}
						text="Norge"
					/>
				) : (
					<div>
						<EtikettLiten className="textWithLabel__label">
							{getMessage(intl, 'oppsummering.text.boddSisteTolv')}
						</EtikettLiten>
						<CountryList visits={utenlandsopphold} type="oppsummering" />
					</div>
				)}

				<DisplayTextWithLabel
					label={getMessage(intl, 'medlemmskap.text.neste12mnd')}
					text={iNorgeNeste12Text}
				/>
				<DisplayTextWithLabel
					label={getMessage(
						intl,
						'oppsummering.text.ogKommerPåFødselstispunktet'
					)}
					text={fodselINorgeText}
				/>
			</div>
		);
	}

	render() {
		const { person, bekreftetInformasjon, intl, dispatch } = this.props;

		if (!person) {
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
					navn={fullNameFormat(
						person.fornavn,
						person.mellomnavn,
						person.etternavn
					)}
					personnummer="XXXXXXXXXXX"
				/>

				<Ingress className="engangsstonadOppsumering__underTitle">
					{getMessage(intl, 'relasjonBarn.sectionheading.relasjonBarn')}
				</Ingress>
				{this.renderRelasjonTilBarnSummary()}

				<Ingress className="engangsstonadOppsumering__underTitle">
					{getMessage(intl, 'medlemmskap.sectionheading.medlemmskap')}
				</Ingress>
				{this.renderMedlemsskapSummary()}

				<ConfirmCheckbox
					name="bekreftOpplysninger"
					checked={this.props.bekreftetInformasjon}
					onChange={() =>
						dispatch(
							common.setBekreftetInformasjon(!this.props.bekreftetInformasjon)
						)
					}
					label={getMessage(intl, 'oppsummering.text.samtykke')}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleNextClicked}
						disabled={!bekreftetInformasjon}>
						{getMessage(intl, 'standard.sectionheading.sendSoknad')}
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

Step3.propTypes = {
	bekreftetInformasjon: PropTypes.bool.isRequired,
	barnErFodt: PropTypes.bool,
	person: PropTypes.shape({}),
	soknad: PropTypes.shape({}),
	medlemsskap: PropTypes.shape({
		fodselINorge: PropTypes.bool,
		iNorgeNeste12: PropTypes.bool,
		iNorgeSiste12: PropTypes.bool,
		utenlandsopphold: PropTypes.array
	}).isRequired,
	relasjonTilBarn: PropTypes.shape({
		antallBarn: PropTypes.number,
		fodselsdato: PropTypes.string,
		terminDato: PropTypes.string,
		utstedtDato: PropTypes.string
	}),
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

Step3.defaultProps = {
	person: undefined,
	soknad: undefined,
	relasjonTilBarn: undefined,
	barnErFodt: undefined
};

const mapStateToProps = (state) => ({
	bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
	person: state.apiReducer.person,
	medlemsskap: state.soknadReducer.medlemsskap,
	relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
	barnErFodt: state.soknadReducer.barnErFodt,
	soknad: state.apiReducer.soknad
});

const withIntl = injectIntl(Step3);
export default connect(mapStateToProps)(withIntl);
