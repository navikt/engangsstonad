import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransformingRadioGroup from './../transforming-radio-group/TransformingRadioGroup';

export default class TransformingRadioGroupCollection extends Component {
	componentWillMount() {
		this.handleOnClickCollapsed = this.handleOnClickCollapsed.bind(this);
		this.handleOnClickExpanded = this.handleOnClickExpanded.bind(this);

		const stages = this.props.stages.slice();
		const expandedStage = stages[0];

		this.setState({ expandedStage, stages });
	}

	getNextStage() {
		const nextStageIndex =
			1 + this.state.stages.indexOf(this.state.expandedStage);

		if (nextStageIndex <= this.state.stages.length - 1) {
			return this.state.stages[nextStageIndex];
		}
		return null;
	}

	mapSelectedValueToExpandedStage(value) {
		const index = this.state.stages.indexOf(this.state.expandedStage);
		const copiedArray = this.state.stages.slice();
		copiedArray[index].selectedValue = value;
		return copiedArray;
	}

	expandNext(value) {
		const updatedStages = this.mapSelectedValueToExpandedStage(value);
		const nextStage = this.getNextStage();

		this.setState({
			expandedStage: nextStage,
			stages: updatedStages
		});
	}

	isCollapsed(stage) {
		return (
			this.state.expandedStage === null ||
			this.state.stages.indexOf(this.state.expandedStage) >
				this.state.stages.indexOf(stage)
		);
	}

	isExpanded(stage) {
		return stage === this.state.expandedStage;
	}

	getStagesToRender() {
		return this.state.stages.slice(
			0,
			this.state.stages.indexOf(this.state.expandedStage) + 1 ||
				this.state.stages.length
		);
	}

	resetExpandedStage(newExpandedStage) {
		const { stages } = this.state;
		const index = stages.indexOf(newExpandedStage);
		if (index > -1) {
			const stagesToReset = stages.slice(index, stages.length + 1);
			const updatedStagesSubArray = stagesToReset.map((stage) => ({
				...stage,
				selectedValue: undefined
			}));
			const updatedStages = [
				...stages.slice(0, index),
				...updatedStagesSubArray
			];
			updatedStages[index].selectedValue = undefined;
			this.setState({
				expandedStage: updatedStages[index],
				stages: updatedStages
			});
		}
	}

	handleOnClickExpanded($e, newExpandedStage) {
		this.expandNext(newExpandedStage);

		setTimeout(() =>
			// after new state is ready
			this.props.onChange($e, this.state.stages, this.state.expandedStage)
		);
	}

	handleOnClickCollapsed($e, newExpandedStage) {
		this.resetExpandedStage(newExpandedStage);

		setTimeout(() =>
			// after new state is ready
			this.props.onChange($e, this.state.stages, this.state.expandedStage)
		);
	}

	render() {
		const stagesToRender = this.getStagesToRender();
		return (
			<div className="transformingRadioGroupCollection">
				{stagesToRender.map((stage) => (
					<TransformingRadioGroup
						collapsed={this.isCollapsed(stage)}
						expanded={this.isExpanded(stage)}
						key={stage.name}
						onClickExpanded={this.handleOnClickExpanded}
						onClickCollapsed={this.handleOnClickCollapsed}
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
			legend: PropTypes.node.isRequired,
			name: PropTypes.node.isRequired,
			values: PropTypes.arrayOf(
				PropTypes.shape({
					label: PropTypes.node.isRequired,
					value: PropTypes.node.isRequired
				}).isRequired
			).isRequired
		})
	).isRequired,
	onChange: PropTypes.func
};

TransformingRadioGroupCollection.defaultProps = {
	onChange: () => {}
};
