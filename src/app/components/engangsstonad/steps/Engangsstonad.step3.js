import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import {
	toggleResidedInNorwayLastTwelveMonths,
	toggleWorkedInNorwayLastTwelveMonths
} from 'ducks/Engangsstonad.duck';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';

// eslint-disable-next-line react/prefer-stateless-function
export class Step3 extends Component {
	componentWillMount() {
		this.radioGroupStages1 = [
			{
				name: 'residedInNorway',
				legend: 'De siste 12 månedene har jeg...',
				values: [
					{ label: 'bodd i Norge', value: 'norway' },
					{ label: 'ikke bodd i Norge', value: 'abroad' }
				]
			}
		];

		this.radioGroupStages2 = [
			{
				name: 'workedInNorway',
				legend: 'og har under den perioden...',
				values: [
					{ label: 'bare arbeidet i Norge', value: 'norway' },
					{ label: 'arbeidet i utlandet', value: 'abroad' }
				]
			}
		];

		this.radioGroupStages3 = [
			{
				name: 'residingCountryNextTwelveMonths',
				legend: 'De neste 12 månedene skal jeg...',
				values: [
					{ label: 'bo i Norge', value: 'norway' },
					{ label: 'ikke bo i Norge', value: 'abroad' }
				]
			},
			{
				name: 'residingCountryDuringBirth',
				legend: 'og kommer på fødselstidspunktet å...',
				values: [
					{ label: 'være i Norge', value: 'norway' },
					{ label: 'være i et annet land', value: 'abroad' }
				]
			}
		];
	}

	residedInNorwayLastTwelveMonthsValueChange($e, stages, expandedStage) {
		if (expandedStage === null) {
			this.props.toggleResidedInNorwayLastTwelveMonths(
				stages[0].selectedValue === this.radioGroupStages1[0].values[0].value
			);
		} else {
			this.props.toggleResidedInNorwayLastTwelveMonths(stages[0].selectedValue);
		}
	}

	workedInNorwayLastTwelveMonthsValueChange($e, stages, expandedStage) {
		if (expandedStage === null) {
			this.props.toggleWorkedInNorwayLastTwelveMonths(
				stages[0].selectedValue === this.radioGroupStages1[0].values[0].value
			);
		} else {
			this.props.toggleWorkedInNorwayLastTwelveMonths(stages[0].selectedValue);
		}
	}

	// eslint-disable-next-line class-methods-use-this, no-unused-vars
	nextTwelveMonthsValueChange($e, stages, expandedStage) {}

	render() {
		return (
			<div className="step3">
				<DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupStages1}
					onChange={($e, stages, expandedStage) =>
						this.residedInNorwayLastTwelveMonthsValueChange(
							$e,
							stages,
							expandedStage
						)
					}
				/>

				{this.props.residedInNorwayLastTwelveMonths === false && (
					<span>CountryPicker goes here</span>
				)}

				{this.props.residedInNorwayLastTwelveMonths !== undefined && (
					<TransformingRadioGroupCollection
						stages={this.radioGroupStages2}
						onChange={($e, stages, expandedStage) =>
							this.workedInNorwayLastTwelveMonthsValueChange(
								$e,
								stages,
								expandedStage
							)
						}
					/>
				)}

				{this.props.workedInNorwayLastTwelveMonths !== undefined && (
					<div>
						<TransformingRadioGroupCollection
							stages={this.radioGroupStages3}
							onChange={($e, stages, expandedStage) =>
								this.nextTwelveMonthsValueChange($e, stages, expandedStage)
							}
						/>
					</div>
				)}
			</div>
		);
	}
}

Step3.propTypes = {
	workedInNorwayLastTwelveMonths: PropTypes.bool,
	residedInNorwayLastTwelveMonths: PropTypes.bool,
	toggleWorkedInNorwayLastTwelveMonths: PropTypes.func.isRequired,
	toggleResidedInNorwayLastTwelveMonths: PropTypes.func.isRequired
};

Step3.defaultProps = {
	workedInNorwayLastTwelveMonths: undefined,
	residedInNorwayLastTwelveMonths: undefined
};

const mapStateToProps = (state) => ({
	residedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.residedInNorwayLastTwelveMonths,
	workedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.workedInNorwayLastTwelveMonths
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleResidedInNorwayLastTwelveMonths,
			toggleWorkedInNorwayLastTwelveMonths
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
