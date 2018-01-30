import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';

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

import './../engangsstonad.less';

export class EngangsstonadStep1 extends Component {
	constructor(props) {
		super(props);

		this.handleNextClicked = this.handleNextClicked.bind(this);

		this.state = {
			isModalOpen: false
		};

		const { intl } = this.props;

		this.radioGroupStages = [
			{
				name: 'whenInTime',
				legend: 'Søknaden gjelder en fødsel som er...',
				values: [
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.fremtid'
						}),
						value: 'ahead'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.fortid'
						}),
						value: 'before'
					}
				]
			},
			{
				name: 'numberOfExpected',
				legend: 'og jeg venter...',
				values: [
					{
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

	handleNextClicked(e) {
		e.preventDefault();
		this.props.history.push('/engangsstonad/step2');
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
			<div className="engangsstonad">
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
							label={intl.formatMessage({
								id: 'relasjonBarn.text.termindato'
							})}
							onChange={(e) => this.props.setTerminDato(e)}
						/>
						{this.props.terminDato && (
							<div>
								<DialogBox type="warning" overflow>
									<Normaltekst>
										{intl.formatMessage({
											id: 'relasjonBarn.text.terminbekreftelse'
										})}
									</Normaltekst>
									<IconLink
										iconKind="info-sirkel-fylt"
										iconSize="24"
										to="#"
										linkText={intl.formatMessage({
											id: 'relasjonBarn.link.lesTerminbekreftelse'
										})}
										onClick={(e) => this.openTerminbekreftelseModal(e)}
									/>
								</DialogBox>
								<DateInput
									id="terminbekreftelse"
									input={{ value: this.props.bekreftetTermindato }}
									label={intl.formatMessage({
										id: 'relasjonBarn.text.datoTerminbekreftelse'
									})}
									onChange={(e) => this.props.setBekreftetTermindato(e)}
								/>
								<div className="engangsstonad__centerButton">
									<Hovedknapp onClick={this.handleNextClicked}>
										Neste
									</Hovedknapp>
								</div>
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

EngangsstonadStep1.propTypes = {
	toggleChildBorn: PropTypes.func.isRequired,
	setNumberOfChildren: PropTypes.func.isRequired,
	setBekreftetTermindato: PropTypes.func.isRequired,
	setTerminDato: PropTypes.func.isRequired,
	noOfChildren: PropTypes.string,
	terminDato: PropTypes.string,
	bekreftetTermindato: PropTypes.string,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

EngangsstonadStep1.defaultProps = {
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

export default injectIntl(
	connect(mapStateToProps, mapDispatchToProps)(EngangsstonadStep1)
);