import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Normaltekst, Element } from 'nav-frontend-typografi';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-skjema';

import {
	toggleChildBorn,
	enableNextButton,
	disableNextButton,
	toggleNoOfChildren,
	setTerminDato,
	setBekreftetTermindato
} from 'ducks/Engangsstonad.duck';

import DialogBox from 'shared/dialog-box/DialogBox';
import DateInput from 'shared/date-input/DateInput';
import AttachmentList from 'shared/attachment-list/AttachmentList';
import AttachmentButton from 'shared/attachment-button/AttachmentButton';
// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';

export class Step2 extends Component {
	constructor(props) {
		super(props);

		this.radioGroupStages = [
			{
				name: 'whenInTime',
				legend: 'Søknaden gjelder en fødsel som er...',
				values: [
					{ label: 'frem i tid', value: 'ahead' },
					{ label: 'tilbake i tid', value: 'before' }
				]
			},
			{
				name: 'numberOfExpected',
				legend: 'og jeg venter...',
				values: [
					{ label: 'ett barn', value: '1' },
					{ label: 'tvillinger', value: '2' },
					{ label: 'flere barn', value: '3' }
				]
			}
		];
	}

	informationAboutChildUpdated(stages, expandedStage) {
		console.log('Updated', stages, expandedStage);
	}

	handleRadioGroupStageChange($e, stages, expandedStage) {
		this.informationAboutChildUpdated(stages, expandedStage);
	}

	render() {
		return (
			<div className="engangsstonadStep2">
				<DialogBox type="info">
					<Normaltekst>
						Vi trenger mer informasjon fra deg om barnet eller barna søknaden
						gjelder
					</Normaltekst>
				</DialogBox>

				<TransformingRadioGroupCollection
					stages={this.radioGroupStages}
					onChange={($e, stages, expandedStage) =>
						this.handleRadioGroupStageChange($e, stages, expandedStage)
					}
				/>

				{this.props.childBorn === false && (
					<div>
						<Element>og jeg venter...</Element>
						<ToggleGruppe
							onChange={this.props.toggleNoOfChildren}
							name="noOfChildren">
							<ToggleKnapp
								defaultChecked={this.props.noOfChildren === '1'}
								value="1">
								et barn
							</ToggleKnapp>
							<ToggleKnapp
								defaultChecked={this.props.noOfChildren === '2'}
								value="2">
								tvillinger
							</ToggleKnapp>
							<ToggleKnapp
								defaultChecked={this.props.noOfChildren === '3'}
								value="3">
								trillinger
							</ToggleKnapp>
						</ToggleGruppe>
						{this.props.noOfChildren && (
							<div>
								<Element>med termindato den...</Element>
								<DateInput onChange={this.props.setTerminDato} label="" />
								{this.props.terminDato && (
									<div>
										<DialogBox type="warning">
											<Normaltekst>
												Siden barnet ikke er født må du legge ved
												terminbekreftelse fra jordmor eller lege
											</Normaltekst>
										</DialogBox>
										<AttachmentList label="" />
										<AttachmentButton />
										<Element>Terminbekreftelsen er datert den...</Element>
										<DateInput
											onChange={this.props.setBekreftetTermindato}
											label=""
										/>
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

Step2.propTypes = {
	toggleNoOfChildren: PropTypes.func.isRequired,
	setBekreftetTermindato: PropTypes.func.isRequired,
	setTerminDato: PropTypes.func.isRequired,
	noOfChildren: PropTypes.string,
	childBorn: PropTypes.bool,
	terminDato: PropTypes.string
};

Step2.defaultProps = {
	childBorn: undefined,
	noOfChildren: undefined,
	terminDato: undefined
};

const mapStateToProps = (state) => ({
	childBorn: state.engangsstonadReducer.childBorn,
	noOfChildren: state.engangsstonadReducer.noOfChildren,
	terminDato: state.engangsstonadReducer.terminDato,
	bekreftetTermindato: state.engangsstonadReducer.bekreftetTermindato
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleChildBorn,
			enableNextButton,
			disableNextButton,
			toggleNoOfChildren,
			setTerminDato,
			setBekreftetTermindato
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
