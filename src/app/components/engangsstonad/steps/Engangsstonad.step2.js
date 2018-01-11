import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Normaltekst } from 'nav-frontend-typografi';

import {
	toggleChildBorn,
	setNumberOfChildren,
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
							label=" termindato den..."
							onChange={(e) => this.props.setTerminDato(e)}
							errorMessage=""
						/>
						{this.props.terminDato && (
							<div>
								<DialogBox type="warning" overflow>
									<Normaltekst>
										Siden barnet ikke er født må du legge ved terminbekreftelse
										fra jordmor eller lege
									</Normaltekst>
								</DialogBox>
								<AttachmentList label="" />
								<AttachmentButton />
								<DateInput
									id="terminbekreftelse"
									input={{ value: this.props.bekreftetTermindato }}
									label="Terminbekreftelsen er datert den..."
									onChange={(e) => this.props.setBekreftetTermindato(e)}
									errorMessage="error test"
								/>
							</div>
						)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
