import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';

import {
	toggleResidingInNorwayNextTwelveMonths,
	toggleResidingInNorwayDuringBirth,
	toggleResidedInNorwayLastTwelveMonths,
	toggleWorkedInNorwayLastTwelveMonths,
	addVisit,
	editVisit,
	deleteVisit
} from 'actions';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';
import CountryPicker from 'shared/country-picker/CountryPicker';

// eslint-disable-next-line react/prefer-stateless-function
export class Step3 extends Component {
	componentWillMount() {
		this.radioGroupStages1 = [
			{
				name: 'residedInNorway',
				legend: <FormattedMessage id="medlemmskap.text.siste12mnd" />,
				values: [
					{
						label: <FormattedMessage id="medlemmskap.radiobutton.boddNorge" />
					},
					{
						label: <FormattedMessage id="medlemmskap.radiobutton.utlandet" />,
						value: 'abroad'
					}
				]
			}
		];

		this.radioGroupStages2 = [
			{
				name: 'workedInNorway',
				legend: <FormattedMessage id="medlemmskap.text.arbeid" />,
				values: [
					{
						label: (
							<FormattedMessage id="medlemmskap.radiobutton.arbeidNorge" />
						),
						value: 'norway'
					},
					{
						label: (
							<FormattedMessage id="medlemmskap.radiobutton.arbeidUtlandet" />
						),
						value: 'abroad'
					},
					{
						label: (
							<FormattedMessage id="medlemmskap.radiobutton.arbeidIkkeJobbet" />
						),
						value: 'none'
					}
				]
			}
		];

		this.radioGroupStages3 = [
			{
				name: 'residingCountryNextTwelveMonths',
				legend: <FormattedMessage id="medlemmskap.text.neste12mnd" />,
				values: [
					{
						label: <FormattedMessage id="medlemmskap.radiobutton.boNorge" />,
						value: 'norway'
					},
					{
						label: <FormattedMessage id="medlemmskap.radiobutton.utlandet" />,
						value: 'abroad'
					}
				]
			},
			{
				name: 'residingCountryDuringBirth',
				legend: <FormattedMessage id="medlemmskap.text.bostedFodsel" />,
				values: [
					{
						label: <FormattedMessage id="medlemmskap.radiobutton.vareNorge" />,
						value: 'norway'
					},
					{
						label: <FormattedMessage id="medlemmskap.vareUtlandet" />,
						value: 'abroad'
					}
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
	nextTwelveMonthsValueChange($e, stages) {
		stages.forEach((stage) => {
			switch (stage.name) {
				case 'residingCountryNextTwelveMonths':
					this.props.toggleResidingInNorwayNextTwelveMonths(
						stage.selectedValue
					);
					break;
				case 'residingCountryDuringBirth':
					this.props.toggleResidingInNorwayDuringBirth(stage.selectedValue);
					break;
				default:
					break;
			}
		});
	}

	shouldDisplayWorkedInNorway() {
		return (
			this.props.residedInNorwayLastTwelveMonths === true ||
			this.props.visits.length > 0
		);
	}

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
					<CountryPicker
						label={<FormattedMessage id="medlemmskap.text.jegBodde" />}
						visits={this.props.visits}
						addVisit={(visit) => this.props.addVisit(visit)}
						deleteVisit={(visit) => this.props.deleteVisit(visit)}
						editVisit={(visit, updatedVisitIndex) => {
							this.props.editVisit(visit, updatedVisitIndex);
						}}
					/>
				)}

				{this.shouldDisplayWorkedInNorway() && (
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
	toggleResidedInNorwayLastTwelveMonths: PropTypes.func.isRequired,
	toggleResidingInNorwayDuringBirth: PropTypes.func.isRequired,
	toggleResidingInNorwayNextTwelveMonths: PropTypes.func.isRequired,
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
	visits: state.engangsstonadReducer.visits,
	residingInNorwayNextTwelveMonths:
		state.engangsstonadReducer.residingInNorwayNextTwelveMonths,
	residingInNorwayDuringBirth:
		state.engangsstonadReducer.residingInNorwayDuringBirth
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			toggleResidedInNorwayLastTwelveMonths,
			toggleWorkedInNorwayLastTwelveMonths,
			toggleResidingInNorwayNextTwelveMonths,
			toggleResidingInNorwayDuringBirth,
			addVisit,
			editVisit,
			deleteVisit
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
