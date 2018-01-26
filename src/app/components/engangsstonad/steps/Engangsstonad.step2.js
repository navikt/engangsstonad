import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
<<<<<<< HEAD
import { injectIntl, intlShape } from 'react-intl';
=======
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421

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

		const { intl } = props;
		this.radioGroupStages = [
			{
				name: 'whenInTime',
				legend: intl.formatMessage({ id: 'relasjonBarn.text.fodselTidspunkt' }),
				values: [
					{
<<<<<<< HEAD
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.fremtid'
						}),
						value: 'ahead'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.fortid'
						}),
=======
						label: <FormattedMessage id="relasjonBarn.radiobutton.fremtid" />,
						value: 'ahead'
					},
					{
						label: <FormattedMessage id="relasjonBarn.radiobutton.fortid" />,
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
						value: 'before'
					}
				]
			},
			{
				name: 'numberOfExpected',
				legend: intl.formatMessage({ id: 'relasjonBarn.text.antallBarn' }),
				values: [
					{
<<<<<<< HEAD
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.etbarn'
						}),
						value: '1'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.tvillinger'
						}),
						value: '2'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.flere'
						}),
=======
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
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
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
		const { intl } = this.props;
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
<<<<<<< HEAD
							label={intl.formatMessage({
								id: 'relasjonBarn.text.termindato'
							})}
=======
							label={
								<FormattedMessage id="relasjonBarn.text.fodselTidspunkt" />
							}
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
							onChange={(e) => this.props.setTerminDato(e)}
						/>
						{this.props.terminDato && (
							<div>
								<DialogBox type="warning" overflow>
									<Normaltekst>
<<<<<<< HEAD
										{intl.formatMessage({
											id: 'relasjonBarn.text.terminbekreftelse'
										})}
=======
										<FormattedMessage id="relasjonBarn.text.terminbekreftelse" />
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
									</Normaltekst>
									<IconLink
										iconKind="info-sirkel-fylt"
										iconSize="24"
										to="#"
<<<<<<< HEAD
										linkText={intl.formatMessage({
											id: 'relasjonBarn.link.lesTerminbekreftelse'
										})}
=======
										linkText={
											<FormattedMessage id="relasjonBarn.link.lesTerminbekreftelse" />
										}
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
										onClick={(e) => this.openTerminbekreftelseModal(e)}
									/>
									<div className="engangsstonadStep2__buttonWrapper">
										<Knapp className="engangsstonadStep2__buttonWrapper__button">
<<<<<<< HEAD
											{intl.formatMessage({
												id: 'standard.button.foto'
											})}
										</Knapp>
										<Knapp className="engangsstonadStep2__buttonWrapper__button">
											{intl.formatMessage({
												id: 'standard.button.fil'
											})}
=======
											<FormattedMessage id="standard.button.foto" />
										</Knapp>
										<Knapp className="engangsstonadStep2__buttonWrapper__button">
											<FormattedMessage id="standard.button.fil" />
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
										</Knapp>
									</div>
								</DialogBox>
								<DateInput
									id="terminbekreftelse"
									input={{ value: this.props.bekreftetTermindato }}
<<<<<<< HEAD
									label={intl.formatMessage({
										id: 'relasjonBarn.text.datoTerminbekreftelse'
									})}
=======
									label={<FormattedMessage id="relasjonBarn.text.termindato" />}
>>>>>>> 92fe0a448f92d7e922ec84cc7bd8b44aba5e2421
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
	bekreftetTermindato: PropTypes.string,
	intl: intlShape.isRequired
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

const withIntl = injectIntl(Step2);
export default connect(mapStateToProps, mapDispatchToProps)(withIntl);
