import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import { Sidetittel } from 'nav-frontend-typografi';

import Stepper from './../stepper/Stepper';
import Step from './../step/Step';

import './stepBasedForm.less';

const Header = (props) => (
	<div className="stepBasedForm__header">
		<Sidetittel>{props.title}</Sidetittel>
	</div>
);

Header.propTypes = {
	title: PropTypes.string
};

Header.defaultProps = {
	title: ''
};

const StepBasedForm = (props) => {
	const isActiveRoute = (route) =>
		route.props.path === props.location.pathname.toLowerCase();
	const findActiveRoute = () =>
		props.routes.find((route) => isActiveRoute(route));

	const findNextRoutePath = () => {
		const numRoutes = props.routes.length;
		if (numRoutes === 1) {
			return props.afterSubmissionRoute;
		}

		const activeRouteIndex = props.routes.indexOf(findActiveRoute());
		const nextRoute = props.routes[activeRouteIndex + 1];
		if (nextRoute && nextRoute.props) {
			return nextRoute.props.path;
		}
		return '/';
	};

	const findPreviousRoutePath = () => {
		const activeRouteIndex = props.routes.indexOf(findActiveRoute());
		if (activeRouteIndex > 0) {
			return props.routes[activeRouteIndex - 1].props.path;
		}
		return undefined;
	};

	const renderRoutes = () =>
		props.routes.map((route) => {
			if (isActiveRoute(route)) {
				return <Step key={route.props.path}>{route}</Step>;
			}
			return route;
		});

	const renderStepper = () => {
		const { routes } = props;
		const activeRoute = findActiveRoute();
		if (activeRoute) {
			if (routes.length === 1) {
				return <Stepper showSubmission nextRoute={findNextRoutePath()} />;
			}
			if (routes.length > 1) {
				return (
					<Stepper
						showStepAhead={activeRoute !== routes[routes.length - 1]}
						showStepBack={activeRoute !== routes[0]}
						showSubmission={activeRoute === routes[routes.length - 1]}
						nextRoute={findNextRoutePath()}
						previousRoute={findPreviousRoutePath()}
					/>
				);
			}
		}
		return null;
	};

	return (
		<div className="stepBasedForm">
			<form className={props.className}>
				<Header title={props.title} />
				<Switch>{renderRoutes()}</Switch>
				{renderStepper()}
			</form>
		</div>
	);
};

StepBasedForm.propTypes = {
	routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
	location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	afterSubmissionRoute: PropTypes.bool,
	title: PropTypes.string,
	className: PropTypes.string
};

StepBasedForm.defaultProps = {
	className: '',
	title: '',
	afterSubmissionRoute: true
};

export default StepBasedForm;
