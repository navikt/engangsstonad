import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransformingRadioGroup from './../transforming-radio-group/TransformingRadioGroup';

export default class TransformingRadioGroupCollection extends Component {
	componentWillMount() {
		this.expandNext = this.expandNext.bind(this);

		this.setState({
			expandedStage: this.props.stages[0],
			allStages: this.props.stages
		});
	}

	getNextStage() {
		const nextStageIndex =
			1 + this.props.stages.indexOf(this.state.expandedStage);

		if (nextStageIndex <= this.props.stages.length - 1) {
			return this.props.stages[nextStageIndex];
		}
		return null;
	}

	mapSelectedValueToExpandedStage(value) {
		const index = this.state.allStages.indexOf(this.state.expandedStage);
		const copiedArray = this.state.allStages.slice();
		copiedArray[index].selectedValue = value;
		return copiedArray;
	}

	expandNext($e, value) {
		const updatedStages = this.mapSelectedValueToExpandedStage(value);
		const nextStage = this.getNextStage();

		this.setState({
			expandedStage: nextStage,
			allStages: updatedStages
		});
	}

	isCollapsed(stage) {
		return (
			this.props.stages.indexOf(this.state.expandedStage) >
			this.props.stages.indexOf(stage)
		);
	}

	isExpanded(stage) {
		return stage === this.state.expandedStage;
	}

	render() {
		return (
			<div className="transformingRadioGroupCollection">
				{this.props.stages.map((stage) => (
					<TransformingRadioGroup
						collapsed={this.isCollapsed(stage)}
						expanded={this.isExpanded(stage)}
						key={stage.name}
						onClick={this.expandNext}
						stage={stage}
					/>
				))}
			</div>
		);
	}
}

TransformingRadioGroupCollection.propTypes = {
	stages: PropTypes.arrayOf(
		PropTypes.shape({
			legend: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			values: PropTypes.arrayOf(
				PropTypes.shape({
					label: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired
				}).isRequired
			).isRequired
		})
	)
};

TransformingRadioGroupCollection.defaultProps = {
	stages: [
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
	]
};
