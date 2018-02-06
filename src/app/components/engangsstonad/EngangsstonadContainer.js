import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import StepIndicator from 'shared/progress-indicator/StepIndicator';
import BackLink from 'shared/back-link/BackLink';
import Header from 'shared/header/Header';
import EngangsstonadStep1 from 'components/engangsstonad/steps/EngangsstonadStep1';
import EngangsstonadStep2 from 'components/engangsstonad/steps/EngangsstonadStep2';
import EngangsstonadStep3 from 'components/engangsstonad/steps/EngangsstonadStep3';

import './engangsstonad.less';

export class EngangsstonadContainer extends Component {
	constructor(props) {
		super(props);

		const { intl } = this.props;
		this.steps = [
			{
				title: intl.formatMessage({
					id: 'relasjonBarn.sectionheading.relasjonBarn'
				}),
				label: '1'
			},
			{
				title: intl.formatMessage({
					id: 'medlemmskap.sectionheading.medlemmskap'
				}),
				label: '2'
			},
			{
				title: intl.formatMessage({
					id: 'oppsummering.sectionheading.oppsummering'
				}),
				label: '3'
			}
		];

		this.state = {
			activeStep: parseInt(props.location.pathname.substr(-1), 10),
			backLinks: [
				'/engangsstonad/',
				'/engangsstonad/step1',
				'/engangsstonad/step2'
			]
		};
	}

	componentWillMount() {
		this.setState({
			activeStep: parseInt(this.props.location.pathname.substr(-1), 10)
		});
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			activeStep: parseInt(newProps.location.pathname.substr(-1), 10)
		});
	}

	render() {
		const { intl } = this.props;
		return (
			<div className="engangsstonad">
				<Header
					title={intl.formatMessage({ id: 'intro.pageheading.soknadES' })}
				/>
				<div className="linkIndicatorWrapper">
					<div className="linkIndicatorWrapper__link">
						<BackLink
							to={this.state.backLinks[this.state.activeStep - 1]}
							tekst={intl.formatMessage({ id: 'standard.button.gaTilbake' })}
						/>
					</div>
					<StepIndicator
						steps={this.steps}
						activeStep={this.state.activeStep}
					/>
				</div>
				<Switch>
					<Route path="/engangsstonad/step1" component={EngangsstonadStep1} />
					<Route path="/engangsstonad/step2" component={EngangsstonadStep2} />
					<Route path="/engangsstonad/step3" component={EngangsstonadStep3} />
					<Redirect
						to={this.state.backLinks[this.state.activeStep - 1]}
						component={EngangsstonadContainer}
					/>
				</Switch>
			</div>
		);
	}
}

EngangsstonadContainer.propTypes = {
	intl: intlShape.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string
	}).isRequired
};

const withIntl = injectIntl(EngangsstonadContainer);
export default withRouter(withIntl);
