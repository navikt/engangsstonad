import React, { Component } from 'react';
import { connect } from 'react-redux';
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
	commonActionCreators as common,
	soknadActionCreators as soknad
} from '../../../redux-ts/actions';

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

	render() {
		const { intl, dispatch, relasjonTilBarn, barnErFodt } = this.props;

		return (
			<div className="engangsstonad">
				<DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupFodsel}
					onChange={($e, stages) => {
						const value = stages[0].selectedValue;
						dispatch(
							soknad.setBarnErFodt(
								value === undefined
									? value
									: stages[0].selectedValue === 'before'
							)
						);
					}}
				/>

				{barnErFodt === true && (
					<div>
						<DateInput
							id="fodselsdato"
							input={{ value: relasjonTilBarn && relasjonTilBarn.fodselsdato }}
							label={intl.formatMessage({
								id: 'relasjonBarn.text.fodselsdato'
							})}
							onChange={(e) => dispatch(soknad.setFodselsdato(e))}
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

				{barnErFodt === false && (
					<TransformingRadioGroupCollection
						stages={this.radioGroupTermindato}
						onChange={($e, stages) =>
							dispatch(soknad.setAntallBarn(stages[0].selectedValue))
						}
					/>
				)}

				{relasjonTilBarn &&
					relasjonTilBarn.antallBarn &&
					barnErFodt === false && (
						<div>
							<DateInput
								id="termindato"
								input={{ value: relasjonTilBarn.terminDato }}
								label={intl.formatMessage({
									id: 'relasjonBarn.text.termindato'
								})}
								onChange={(e) => dispatch(soknad.setTerminDato(e))}
							/>

							{relasjonTilBarn.terminDato && (
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
										input={{ value: relasjonTilBarn.utstedtDato }}
										label={intl.formatMessage({
											id: 'relasjonBarn.text.datoTerminbekreftelse'
										})}
										onChange={(e) => dispatch(soknad.setUtstedtDato(e))}
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
	dispatch: PropTypes.func.isRequired,
	// eslint-disable-next-line react/require-default-props
	barnErFodt: PropTypes.bool,
	// eslint-disable-next-line react/require-default-props
	relasjonTilBarn: PropTypes.shape({}),
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
	relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
	barnErFodt: state.soknadReducer.barnErFodt
});

export default injectIntl(connect(mapStateToProps)(EngangsstonadStep1));
