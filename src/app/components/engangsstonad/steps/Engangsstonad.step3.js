import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
	toggleResidedInNorwayLastTwelveMonths,
	toggleWorkedInNorwayLastTwelveMonths,
	addVisit,
	editVisit,
	deleteVisit
} from 'ducks/Engangsstonad.duck';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';
import CountryPicker from 'shared/country-picker/CountryPicker';

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
					<CountryPicker
						label="ettersom jeg bodde i…"
						visits={this.props.visits}
						addVisit={(visit) => this.props.addVisit(visit)}
						deleteVisit={(visit) => this.props.deleteVisit(visit)}
						editVisit={(visit, updatedVisitIndex) => {
							this.props.editVisit(visit, updatedVisitIndex);
						}}
					/>
				)}

				{this.props.residedInNorwayLastTwelveMonths !== undefined &&
					this.props.visits.length > 0 && (
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

				{this.props.workedInNorwayLastTwelveMonths !== undefined &&
					this.props.visits.length > 0 && (
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
	toggleResidedInNorwayLastTwelveMonths: PropTypes.func.isRequired,
	addVisit: PropTypes.func.isRequired,
	deleteVisit: PropTypes.func.isRequired,
	editVisit: PropTypes.func.isRequired,

	visits: PropTypes.arrayOf(
		PropTypes.shape({
			country: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string
		})
	).isRequired
};

Step3.defaultProps = {
	workedInNorwayLastTwelveMonths: undefined,
	residedInNorwayLastTwelveMonths: undefined
};

const mapStateToProps = (state) => ({
	residedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.residedInNorwayLastTwelveMonths,
	workedInNorwayLastTwelveMonths:
		state.engangsstonadReducer.workedInNorwayLastTwelveMonths,
	visits: state.engangsstonadReducer.visits
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleResidedInNorwayLastTwelveMonths,
			toggleWorkedInNorwayLastTwelveMonths,
			addVisit,
			editVisit,
			deleteVisit
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
