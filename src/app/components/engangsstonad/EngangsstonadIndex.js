import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import StepIndicator from 'shared/progress-indicator/StepIndicator';
import BackLink from 'shared/back-link/BackLink';
import Header from 'shared/header/Header';
import EngangsstonadStep1 from './steps/EngangsstonadStep1';
import EngangsstonadStep2 from './steps/EngangsstonadStep2';
import EngangsstonadStep3 from './steps/EngangsstonadStep3';

import './engangsstonad.less';

const steps = [
	{
		title: 'Relasjon til barn',
		label: '1'
	},
	{
		title: 'Tilknytning til Norge',
		label: '2'
	},
	{
		title: 'Oppsummering',
		label: '3'
	}
];

export class EngangsstonadIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: parseInt(props.location.pathname.substr(-1), 10),
			backLinks: [
				'/engangsstonad',
				'/engangsstonad/step1',
				'/engangsstonad/step2'
			]
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			activeStep: parseInt(newProps.location.pathname.substr(-1), 10)
		});
	}

	render() {
		return (
			<div className="engangsstonad">
				<Header title="Søknad om engangsstønad" />
				<div className="linkIndicatorWrapper">
					<div className="linkIndicatorWrapper__link">
						<BackLink to={this.state.backLinks[this.state.activeStep - 1]} />
					</div>
					<StepIndicator steps={steps} activeStep={this.state.activeStep} />
				</div>
				<Switch>
					<Route path="/engangsstonad/step1" component={EngangsstonadStep1} />
					<Route path="/engangsstonad/step2" component={EngangsstonadStep2} />
					<Route path="/engangsstonad/step3" component={EngangsstonadStep3} />
				</Switch>
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string
	}).isRequired
};

export default EngangsstonadIndex;
