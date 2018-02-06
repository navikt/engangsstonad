import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';
import CountryPicker from 'shared/country-picker/CountryPicker';

import {
	toggleResidingInNorwayNextTwelveMonths,
	toggleResidingInNorwayDuringBirth,
	toggleResidedInNorwayLastTwelveMonths,
	toggleWorkedInNorwayLastTwelveMonths,
	addVisit,
	editVisit,
	deleteVisit
} from '../../../redux/actions/actions';

import './../engangsstonad.less';

// eslint-disable-next-line react/prefer-stateless-function
export class EngangsstonadStep2 extends Component {
	constructor(props) {
		super(props);

		this.handleNextClicked = this.handleNextClicked.bind(this);
	}

	componentWillMount() {
		const { intl } = this.props;
		this.radioGroupStages1 = [
			{
				name: 'residedInNorway',
				legend: intl.formatMessage({ id: 'medlemmskap.text.siste12mnd' }),
				values: [
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.boddNorge'
						}),
						value: 'norway'
					},
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.utlandet'
						}),
						value: 'abroad'
					}
				]
			}
		];

		this.radioGroupStages2 = [
			{
				name: 'workedInNorway',
				legend: intl.formatMessage({ id: 'medlemmskap.text.arbeid' }),
				values: [
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.arbeidNorge'
						}),
						value: 'norway'
					},
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.arbeidUtlandet'
						}),
						value: 'abroad'
					},
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.arbeidIkkeJobbet'
						}),
						value: 'none'
					}
				]
			}
		];

		this.radioGroupStages3 = [
			{
				name: 'residingCountryNextTwelveMonths',
				legend: intl.formatMessage({ id: 'medlemmskap.text.neste12mnd' }),
				values: [
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.boNorge'
						}),
						value: 'norway'
					},
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.boUtlandet'
						}),
						value: 'abroad'
					}
				]
			},
			{
				name: 'residingCountryDuringBirth',
				legend: intl.formatMessage({ id: 'medlemmskap.text.bostedFodsel' }),
				values: [
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radiobutton.vareNorge'
						}),
						value: 'norway'
					},
					{
						label: intl.formatMessage({
							id: 'medlemmskap.radioButton.vareUtlandet'
						}),
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

	handleNextClicked(e) {
		e.preventDefault();
		this.props.history.push('/engangsstonad/step3');
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
				default:
					break;
			}
		});
	}

	shouldDisplayResidingInFutureRadioGroup() {
		return (
			this.props.residedInNorwayLastTwelveMonths === true ||
			this.props.visits.length > 0
		);
	}

	render() {
		const { intl } = this.props;
		return (
			<div className="engangsstonad">
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
						label={intl.formatMessage({
							id: 'medlemmskap.text.jegBodde'
						})}
						visits={this.props.visits}
						addVisit={(visit) => this.props.addVisit(visit)}
						deleteVisit={(visit) => this.props.deleteVisit(visit)}
						editVisit={(visit, updatedVisitIndex) => {
							this.props.editVisit(visit, updatedVisitIndex);
						}}
					/>
				)}

				{this.shouldDisplayResidingInFutureRadioGroup() && (
					<div>
						<TransformingRadioGroupCollection
							stages={this.radioGroupStages3}
							onChange={($e, stages, expandedStage) =>
								this.nextTwelveMonthsValueChange($e, stages, expandedStage)
							}
						/>
						<div className="engangsstonad__centerButton">
							<Hovedknapp onClick={this.handleNextClicked}>Neste</Hovedknapp>
						</div>
					</div>
				)}
			</div>
		);
	}
}

EngangsstonadStep2.propTypes = {
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
	).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

EngangsstonadStep2.defaultProps = {
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

export default injectIntl(
	connect(mapStateToProps, mapDispatchToProps)(EngangsstonadStep2)
);
