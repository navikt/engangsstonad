import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

import Checkbox from 'shared/checkbox/Checkbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import {
	confirmInformation,
	enableNextButton,
	disableNextButton
} from 'ducks/Engangsstonad.duck';

export class Step4 extends Component {
	constructor(props) {
		super(props);

		if (props.confirmedInformation) {
			this.props.enableNextButton();
		} else {
			this.props.disableNextButton();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.confirmedInformation) {
			return this.props.enableNextButton();
		}

		return this.props.disableNextButton();
	}

	render() {
		return (
			<div>
				<DialogBox type="info">
					<Normaltekst>
						Les nøye gjennom oppsummeringen før du sender inn søknaden. Hvis du
						trenger å gjøre endringer kan du gå tilbake til tidligere steg
					</Normaltekst>
				</DialogBox>
				<Undertittel>Om deg som søker</Undertittel>
				<DisplayTextWithLabel label="Navn" text="Lise Mari Haugland" />
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
				<DisplayTextWithLabel
					label="Adresse"
					text="Stockholmsgata 16B, 0566 Oslo, Norge"
				/>
				<DisplayTextWithLabel
					label="Oppholdt seg i Norge de siste 12 månedene"
					text="Ja"
				/>
				<DisplayTextWithLabel label="Oppholder seg i Norge nå" text="Ja" />
				<DisplayTextWithLabel
					label="Skal oppholde seg i Norge de neste 12 månedene"
					text="Ja"
				/>
				<Checkbox
					name="bekreftOpplysninger"
					className="checkboxFieldWithBackground"
					checked={this.props.confirmedInformation}
					onChange={this.props.confirmInformation}
					label="De opplysninger jeg har oppgitt er riktig og jeg har ikke holdt tilbake opplysninger
                som har betydning for min rett til engangsstønad."
				/>
			</div>
		);
	}
}

Step4.propTypes = {
	confirmInformation: PropTypes.func.isRequired,
	enableNextButton: PropTypes.func.isRequired,
	disableNextButton: PropTypes.func.isRequired,
	confirmedInformation: PropTypes.bool
};

Step4.defaultProps = {
	confirmedInformation: false
};

const mapStateToProps = (state) => ({
	confirmedInformation: state.engangsstonadReducer.confirmedInformation
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			confirmInformation,
			enableNextButton,
			disableNextButton
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
