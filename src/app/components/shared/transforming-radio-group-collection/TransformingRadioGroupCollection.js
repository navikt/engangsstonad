import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransformingRadioGroup from './../transforming-radio-group/TransformingRadioGroup';

export default class TransformingRadioGroupCollection extends Component {
	componentWillMount() {
		this.expandNext = this.expandNext.bind(this);

		this.state = {
			expandedStage: this.props.stages[0]
		};
	}

	getNextStage() {
		const nextStageIndex =
			1 + this.props.stages.indexOf(this.state.expandedStage);

		if (nextStageIndex <= this.props.stages.length - 1) {
			return this.props.stages[nextStageIndex];
		}
		return null;
	}

	expandNext($e, value) {
		this.setState({
			expandedStage: this.getNextStage()
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
						stage={stage}
						key={stage.name}
						onClick={this.expandNext}
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
			radios: PropTypes.arrayOf(
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
			radios: [
				{ label: 'frem i tid', value: 'ahead' },
				{ label: 'tilbake i tid', value: 'before' }
			]
		},
		{
			name: 'numberOfExpected',
			legend: 'og jeg venter...',
			radios: [
				{ label: 'ett barn', value: '1' },
				{ label: 'tvillinger', value: '2' },
				{ label: 'flere barn', value: '3' }
			]
		}
	]
};
