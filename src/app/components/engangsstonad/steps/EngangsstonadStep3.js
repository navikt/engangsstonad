import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import { confirmInformation } from 'actions';
import { fullNameFormat } from 'util/formats/index';

import './../engangsstonad.less';

// eslint-disable-next-line react/prefer-stateless-function
export class EngangsstonadStep3 extends Component {
	constructor(props) {
		super(props);

		this.handleNextClicked = this.handleNextClicked.bind(this);
	}

	handleNextClicked(e) {
		e.preventDefault();
		this.props.history.push('/engangsstonad/step4');
	}

	render() {
		const { data, confirmedInformation } = this.props;

		if (!data) {
			return null;
		}

		return (
			<div className="engangsstonad">
				<DocumentTitle title="NAV Engangsstønad - Oppsummering" />
				<DialogBox type="info">
					<Normaltekst>
						<FormattedMessage id="oppsummering.text.lesNoye" />
					</Normaltekst>
				</DialogBox>
				<Undertittel>Om deg som søker</Undertittel>
				<DisplayTextWithLabel
					label="Navn"
					text={fullNameFormat(data.fornavn, data.mellomnavn, data.etternavn)}
				/>
				<DisplayTextWithLabel label="Fødselsnummer" text="00000000000" />
				<Undertittel>Opplysninger om barnet eller barna</Undertittel>
				<DisplayTextWithLabel label="Antall barn forventet" text="1" />
				<DisplayTextWithLabel label="Forventet termindato" text="01.01.2018" />
				<DisplayTextWithLabel
					label="Utstedt dato for terminbekreftelse"
					text="01.12.2017"
				/>
				<DisplayTextWithLabel label="Vedlegg" text="<link til vedlegg her>" />
				<Undertittel>Opplysninger om tilknytning til Norge</Undertittel>
				<DisplayTextWithLabel label="Adresse" text={data.adresse} />
				<DisplayTextWithLabel
					label="Oppholdt seg i Norge de siste 12 månedene"
					text="Ja"
				/>
				<DisplayTextWithLabel label="Oppholder seg i Norge nå" text="Ja" />
				<DisplayTextWithLabel
					label="Skal oppholde seg i Norge de neste 12 månedene"
					text="Ja"
				/>
				<ConfirmCheckbox
					name="bekreftOpplysninger"
					checked={confirmedInformation}
					onChange={this.props.confirmInformation}
					label={<FormattedMessage id="oppsummering.text.samtykke" />}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleNextClicked}
						disabled={!confirmedInformation}>
						Send søknad
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

EngangsstonadStep3.propTypes = {
	confirmInformation: PropTypes.func.isRequired,
	confirmedInformation: PropTypes.bool,
	data: PropTypes.shape({}),
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

EngangsstonadStep3.defaultProps = {
	confirmedInformation: false,
	data: null
};

const mapStateToProps = (state) => ({
	confirmedInformation: state.engangsstonadReducer.confirmedInformation,
	data: state.engangsstonadReducer.data
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			confirmInformation
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(EngangsstonadStep3);
