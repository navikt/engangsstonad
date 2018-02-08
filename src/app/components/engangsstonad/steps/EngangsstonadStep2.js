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
		dispatch(soknad.setINorgeSiste12(inNorway === selectedValue));
	}

	neste12ValueChanged($e, stages) {
		const { dispatch } = this.props;
		stages.forEach((stage) => {
			const { selectedValue } = stages;
			const inNorway = stage.values[0].value;

			switch (stage.name) {
				case 'iNorgeNeste12':
					dispatch(soknad.setINorgeNeste12(selectedValue === inNorway));
					break;
				case 'fodselINorge':
					dispatch(soknad.setFodselINorge(selectedValue === inNorway));
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
		const { iNorgeSiste12, utenlandsopphold } = this.props;
		return iNorgeSiste12 === true || utenlandsopphold.length > 0;
	}

	render() {
		const { dispatch, intl, utenlandsopphold } = this.props;
		return (
			<div className="engangsstonad">
				<DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
				<TransformingRadioGroupCollection
					stages={this.radioGroupStages1}
					onChange={($e, stages) => this.iNorgeSiste12ValueChanged($e, stages)}
				/>

				{this.props.iNorgeSiste12 === false && (
					<CountryPicker
						label={intl.formatMessage({
							id: 'medlemmskap.text.jegBodde'
						})}
						visits={utenlandsopphold}
						addVisit={(utl) => dispatch(soknad.addUtenlandsopphold(utl))}
						deleteVisit={(utl) => dispatch(soknad.deleteUtenlandsopphold(utl))}
						editVisit={(utl) =>
							dispatch(
								soknad.editUtenlandsopphold(utl, utenlandsopphold.indexOf(utl))
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
	dispatch: PropTypes.func.isRequired,
	iNorgeSiste12: PropTypes.bool,
	utenlandsopphold: PropTypes.arrayOf(
		PropTypes.shape({
			land: PropTypes.string,
			fom: PropTypes.string,
			tom: PropTypes.string
		})
	).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	intl: intlShape.isRequired
};

EngangsstonadStep2.defaultProps = {
	iNorgeSiste12: undefined
};

const mapStateToProps = (state) => ({
	iNorgeSiste12: state.soknadReducer.iNorgeSiste12,
	utenlandsopphold: state.soknadReducer.utenlandsopphold,
	iNorgeNeste12: state.soknadReducer.iNorgeNeste12,
	fodselINorge: state.soknadReducer.fodselINorge
});

export default injectIntl(connect(mapStateToProps)(EngangsstonadStep2));
