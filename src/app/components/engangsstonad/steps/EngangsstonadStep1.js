import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';

import IconLink from 'shared/icon-link/IconLink';
import DialogBox from 'shared/dialog-box/DialogBox';
import DateInput from 'shared/date-input/DateInput';
import OmTerminbekreftelsen from 'shared/modal-content/OmTerminbekreftelsen';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';

import {
	toggleChildBorn,
	setNumberOfChildren,
	setTerminDato,
	setBekreftetTermindato,
	setFodselDato
} from '../../../redux/actions/actions';

import './../engangsstonad.less';

export class EngangsstonadStep1 extends Component {
	constructor(props) {
		super(props);

		this.handleNextClicked = this.handleNextClicked.bind(this);

		this.state = {
			isModalOpen: false
		};

		const { intl } = this.props;

		this.radioGroupFodsel = [
			{
				name: 'whenInTime',
				legend: intl.formatMessage({ id: 'relasjonBarn.text.fodselTidspunkt' }),
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
			}
		];

		this.radioGroupTermindato = [
			{
				name: 'numberOfExpected',
				legend: intl.formatMessage({ id: 'relasjonBarn.text.antallBarn' }),
				values: [
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.ettbarn'
						}),
						value: 'ett'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.tvillinger'
						}),
						value: 'tvillinger'
					},
					{
						label: intl.formatMessage({
							id: 'relasjonBarn.radiobutton.flere'
						}),
						value: 'flere'
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

	childBirthChanged($e, stages, expandedStage) {
		if (expandedStage === null) {
			this.props.toggleChildBorn(stages[0].selectedValue);
		} else {
			this.props.toggleChildBorn(stages[0].selectedValue);
		}
	}

	noOfChildrenChanged($e, stages, expandedStage) {
		if (expandedStage === null) {
			this.props.setNumberOfChildren(stages[0].selectedValue);
		} else {
			this.props.setNumberOfChildren(stages[0].selectedValue);
		}
	}

	render() {
		const { intl } = this.props;

		return (
			<div className="engangsstonad">
				<DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupFodsel}
					onChange={($e, stages, expandedStage) =>
						this.childBirthChanged($e, stages, expandedStage)
					}
				/>
				{this.props.childBorn === true && (
					<div>
						<DateInput
							id="fodselsdato"
							input={{ value: this.props.fodselDato }}
							label={intl.formatMessage({
								id: 'relasjonBarn.text.fodseldato'
							})}
							onChange={(e) => this.props.setFodselDato(e)}
						/>
						<div className="engangsstonad__centerButton">
							<Hovedknapp onClick={this.handleNextClicked}>Neste</Hovedknapp>
						</div>
					</div>
				)}
				{this.props.childBorn === false && (
					<TransformingRadioGroupCollection
						stages={this.radioGroupTermindato}
						onChange={($e, stages, expandedStage) =>
							this.noOfChildrenChanged($e, stages, expandedStage)
						}
					/>
				)}
				{this.props.noOfChildren &&
					this.props.childBorn === false && (
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
											{intl.formatMessage({
												id: 'standard.button.neste'
											})}
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
	fodselDato: PropTypes.string,
	childBorn: PropTypes.bool,
	toggleChildBorn: PropTypes.func.isRequired,
	setNumberOfChildren: PropTypes.func.isRequired,
	setBekreftetTermindato: PropTypes.func.isRequired,
	setTerminDato: PropTypes.func.isRequired,
	setFodselDato: PropTypes.func.isRequired,
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
	terminDato: undefined,
	childBorn: undefined,
	fodselDato: undefined
};

const mapStateToProps = (state) => ({
	noOfChildren: state.engangsstonadReducer.noOfChildren,
	terminDato: state.engangsstonadReducer.terminDato,
	bekreftetTermindato: state.engangsstonadReducer.bekreftetTermindato,
	childBorn: state.engangsstonadReducer.childBorn,
	fodselDato: state.engangsstonadReducer.fodselDato
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleChildBorn,
			setNumberOfChildren,
			setTerminDato,
			setBekreftetTermindato,
			setFodselDato
		},
		dispatch
	);

export default injectIntl(
	connect(mapStateToProps, mapDispatchToProps)(EngangsstonadStep1)
);
