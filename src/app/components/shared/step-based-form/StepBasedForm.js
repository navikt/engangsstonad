import React from 'react';

import { Sidetittel } from 'nav-frontend-typografi';

import Stepper from './../stepper/Stepper';
import Step from './../step/Step';

import './stepBasedForm.less';

type FormProps = {
    routes: Array<Function>,
    afterSubmissionRoute: string,
    title: string,
    // eslint-disable-next-line react/no-unused-prop-types
    nextButtonEnabled: boolean,
    className: string
}

type HeaderProps = {
    title: string
}

const Header = (props: HeaderProps) => (
    <div className="stepBasedForm__header">
        <Sidetittel>{props.title}</Sidetittel>
    </div>
);

const StepBasedForm = (props: FormProps) => {
    const isActiveRoute = (route) => (route.props.path === window.location.pathname);
    const findActiveRoute = () => (props.routes.find((route) => isActiveRoute(route)));

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

    const renderRoutes = () => (
        props.routes.map((route) => {
            if (isActiveRoute(route)) {
                return (<Step key={route.props.path}>{route}</Step>);
            }
            return route;
        })
    );

    const renderStepper = () => {
        const { routes } = props;
        const activeRoute = findActiveRoute();
        if (activeRoute) {
            if (routes.length === 1) {
                return (
                    <Stepper
                        nextButtonEnabled={props.nextButtonEnabled}
                        showSubmission
                        nextRoute={findNextRoutePath()}
                    />
                );
            }
            if (routes.length > 1) {
                return (
                    <Stepper
                        nextButtonEnabled={props.nextButtonEnabled}
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
                {renderRoutes()}
                {renderStepper()}
            </form>
        </div>
    );
};

export default StepBasedForm;
