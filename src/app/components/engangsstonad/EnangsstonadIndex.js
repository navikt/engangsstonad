import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryStringParser from 'query-string';

import { getDataRequested } from 'actions';

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
			activeStep: 1,
			backLinks: [
				'/engangsstonad',
				'/engangsstonad/step1',
				'/engangsstonad/step2'
			]
		};
	}

	componentWillMount() {
		const queryParams = this.getQueryParams();

		if (Object.keys(queryParams).length > 0) {
			this.props.dispatch(getDataRequested(queryParams));
		} else {
			this.props.dispatch(getDataRequested());
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			activeStep: parseInt(newProps.location.pathname.substr(-1), 10)
		});
	}

	getQueryParams() {
		return queryStringParser.parse(this.props.location.search);
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
		search: PropTypes.string,
		pathname: PropTypes.string
	}).isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data
});

export default withRouter(connect(mapStateToProps)(EngangsstonadIndex));
