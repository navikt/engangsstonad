import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

// eslint-disable-next-line max-len
import TransformingRadioGroupCollection from 'shared/transforming-radio-group-collection/TransformingRadioGroupCollection';
import CountryPicker from 'shared/country-picker/CountryPicker';

import { soknadActionCreators as soknad } from '../../../redux-ts/actions';

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
				name: 'iNorgeNeste12',
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
				name: 'fodselINorge',
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

	iNorgeSiste12ValueChanged($e, stages) {
		const { dispatch } = this.props;
		const { selectedValue } = stages[0];
		const inNorway = this.radioGroupStages1[0].values[0].value;
		dispatch(
			soknad.setINorgeSiste12(
				selectedValue === undefined ? selectedValue : inNorway === selectedValue
			)
		);
	}

	neste12ValueChanged($e, stages) {
		const { dispatch } = this.props;
		stages.forEach((stage) => {
			const { selectedValue } = stages[0];
			const inNorway = stage.values[0].value;

			switch (stage.name) {
				case 'iNorgeNeste12':
					dispatch(
						soknad.setINorgeNeste12(
							selectedValue === undefined
								? selectedValue
								: selectedValue === inNorway
						)
					);
					break;
				case 'fodselINorge':
					dispatch(
						soknad.setFodselINorge(
							selectedValue === undefined
								? selectedValue
								: selectedValue === inNorway
						)
					);
					break;
				default:
					break;
			}
		});
	}

	handleNextClicked(e) {
		e.preventDefault();
		this.props.history.push('/engangsstonad/step3');
	}

	shouldDisplayResidingInFutureRadioGroup() {
		const { iNorgeSiste12, utenlandsopphold } = this.props.medlemsskap;
		return iNorgeSiste12 === true || utenlandsopphold.length > 0;
	}

	renderNesteKnapp() {
		const {
			iNorgeSiste12,
			utenlandsopphold,
			iNorgeNeste12,
			fodselINorge
		} = this.props.medlemsskap;

		const completedFirstPath =
			iNorgeSiste12 !== undefined &&
			iNorgeNeste12 !== undefined &&
			fodselINorge !== undefined;
		const completedSecondPath =
			iNorgeSiste12 !== undefined &&
			utenlandsopphold.length > 0 &&
			iNorgeNeste12 !== undefined &&
			fodselINorge !== undefined;

		if (completedFirstPath || completedSecondPath)
			return (
				<div className="engangsstonad__centerButton">
					<Hovedknapp onClick={this.handleNextClicked}>Neste</Hovedknapp>
				</div>
			);
		return null;
	}

	render() {
		const { dispatch, intl, medlemsskap } = this.props;
		return (
			<div className="engangsstonad">
				<DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupStages1}
					onChange={($e, stages) => this.iNorgeSiste12ValueChanged($e, stages)}
				/>

				{medlemsskap.iNorgeSiste12 === false && (
					<CountryPicker
						label={intl.formatMessage({
							id: 'medlemmskap.text.jegBodde'
						})}
						visits={medlemsskap.utenlandsopphold}
						addVisit={(utl) => dispatch(soknad.addUtenlandsopphold(utl))}
						deleteVisit={(utl) => dispatch(soknad.deleteUtenlandsopphold(utl))}
						editVisit={(utl) =>
							dispatch(
								soknad.editUtenlandsopphold(
									utl,
									medlemsskap.utenlandsopphold.indexOf(utl)
								)
							)
						}
					/>
				)}

				{this.shouldDisplayResidingInFutureRadioGroup() && (
					<div>
						<TransformingRadioGroupCollection
							stages={this.radioGroupStages2}
							onChange={($e, stages, expandedStage) =>
								this.neste12ValueChanged($e, stages, expandedStage)
							}
						/>
					</div>
				)}

				{this.renderNesteKnapp()}
			</div>
		);
	}
}

EngangsstonadStep2.propTypes = {
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired,
	medlemsskap: PropTypes.shape({
		utenlandsopphold: PropTypes.array,
		iNorgeSiste12: PropTypes.bool,
		iNorgeNeste12: PropTypes.bool,
		fodselINorge: PropTypes.bool
	}).isRequired
};

const mapStateToProps = (state) => ({
	medlemsskap: state.soknadReducer.medlemsskap
});

export default injectIntl(connect(mapStateToProps)(EngangsstonadStep2));
