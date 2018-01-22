import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';

import {
	toggleChildBorn,
	setNumberOfChildren,
	setTerminDato,
	setBekreftetTermindato
} from 'actions';

import IconLink from 'shared/icon-link/IconLink';
import DialogBox from 'shared/dialog-box/DialogBox';
import DateInput from 'shared/date-input/DateInput';
import OmTerminbekreftelsen from 'shared/modal-content/OmTerminbekreftelsen';
// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';

import './engangsstonad.step2.less';

export class Step2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};

		this.radioGroupStages = [
			{
				name: 'whenInTime',
				legend: <FormattedMessage id="relasjonBarn.text.fodselTidspunkt" />,
				values: [
					{
						label: <FormattedMessage id="relasjonBarn.radiobutton.fremtid" />,
						value: 'ahead'
					},
					{
						label: <FormattedMessage id="relasjonBarn.radiobutton.fortid" />,
						value: 'before'
					}
				]
			},
			{
				name: 'numberOfExpected',
				legend: <FormattedMessage id="relasjonBarn.text.antallBarn" />,
				values: [
					{
						label: <FormattedMessage id="relasjonBarn.radiobutton.etbarn" />,
						value: '1'
					},
					{
						label: (
							<FormattedMessage id="relasjonBarn.radiobutton.tvillinger" />
						),
						value: '2'
					},
					{
						label: <FormattedMessage id="relasjonBarn.radiobutton.flere" />,
						value: '3'
					}
				]
			}
		];
	}

	componentDidMount() {
		Modal.setAppElement('#app');
	}

	openTerminbekreftelseModal(e) {
		e.preventDefault();
		this.setState({ isModalOpen: true });
	}

	closeTerminbekreftelseModal() {
		this.setState({ isModalOpen: false });
	}

	informationAboutChildUpdated(stages) {
		stages.forEach((stage) => {
			switch (stage.name) {
				case 'whenInTime':
					this.props.toggleChildBorn(stage.selectedValue);
					break;
				case 'numberOfExpected':
					this.props.setNumberOfChildren(stage.selectedValue);
					break;
				default:
					break;
			}
		});
	}

	handleRadioGroupStageChange($e, stages) {
		this.informationAboutChildUpdated(stages);
	}

	render() {
		return (
			<div className="engangsstonadStep2">
				<DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupStages}
					onChange={($e, stages) =>
						this.handleRadioGroupStageChange($e, stages)
					}
				/>
				{this.props.noOfChildren && (
					<div>
						<DateInput
							id="termindato"
							input={{ value: this.props.terminDato }}
							label={
								<FormattedMessage id="relasjonBarn.text.fodselTidspunkt" />
							}
							onChange={(e) => this.props.setTerminDato(e)}
						/>
						{this.props.terminDato && (
							<div>
								<DialogBox type="warning" overflow>
									<Normaltekst>
										<FormattedMessage id="relasjonBarn.text.terminbekreftelse" />
									</Normaltekst>
									<IconLink
										iconKind="info-sirkel-fylt"
										iconSize="24"
										to="#"
										linkText={
											<FormattedMessage id="relasjonBarn.link.lesTerminbekreftelse" />
										}
										onClick={(e) => this.openTerminbekreftelseModal(e)}
									/>
									<div className="engangsstonadStep2__buttonWrapper">
										<Knapp className="engangsstonadStep2__buttonWrapper__button">
											<FormattedMessage id="standard.button.foto" />
										</Knapp>
										<Knapp className="engangsstonadStep2__buttonWrapper__button">
											<FormattedMessage id="standard.button.fil" />
										</Knapp>
									</div>
								</DialogBox>
								<DateInput
									id="terminbekreftelse"
									input={{ value: this.props.bekreftetTermindato }}
									label={<FormattedMessage id="relasjonBarn.text.termindato" />}
									onChange={(e) => this.props.setBekreftetTermindato(e)}
								/>
							</div>
						)}
						<Modal
							isOpen={this.state.isModalOpen}
							closeButton
							onRequestClose={() => this.closeTerminbekreftelseModal()}
							contentLabel="om terminbekreftelsen">
							<OmTerminbekreftelsen />
						</Modal>
					</div>
				)}
			</div>
		);
	}
}

Step2.propTypes = {
	toggleChildBorn: PropTypes.func.isRequired,
	setNumberOfChildren: PropTypes.func.isRequired,
	setBekreftetTermindato: PropTypes.func.isRequired,
	setTerminDato: PropTypes.func.isRequired,
	noOfChildren: PropTypes.string,
	terminDato: PropTypes.string,
	bekreftetTermindato: PropTypes.string
};

Step2.defaultProps = {
	noOfChildren: undefined,
	bekreftetTermindato: undefined,
	terminDato: undefined
};

const mapStateToProps = (state) => ({
	noOfChildren: state.engangsstonadReducer.noOfChildren,
	terminDato: state.engangsstonadReducer.terminDato,
	bekreftetTermindato: state.engangsstonadReducer.bekreftetTermindato
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleChildBorn,
			setNumberOfChildren,
			setTerminDato,
			setBekreftetTermindato
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps);
