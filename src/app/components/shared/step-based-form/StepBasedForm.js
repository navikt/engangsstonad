import React from 'react';

import { Sidetittel } from 'nav-frontend-typografi';

import Stepper from './../stepper/Stepper';
import Step from './../step/Step';
import ElementWrapper from './../../../util/ElementWrapper';
import Image from './../../shared/Image';
import NAVLogoUrl from './../../../assets/svg/logo.svg';

import styles from './stepBasedForm.less';

type FormProps = {
    routes: Array<Function>,
    afterSubmissionRoute: string,
    title: string
}

type HeaderProps = {
    title: string
}

const Header = (props: HeaderProps) => (
    <ElementWrapper>
        <Image className={styles.center} imageUrl={NAVLogoUrl} alt="NAV Logo" />
        <Sidetittel className={styles.centerText}>{props.title}</Sidetittel>
    </ElementWrapper>
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
                    <Stepper showSubmission nextRoute={findNextRoutePath()} />
                );
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
        <div className={styles.stepBasedForm}>
            <form>
                <Header title={props.title} />
                {renderRoutes()}
                {renderStepper()}
            </form>
        </div>
    );
};

export default StepBasedForm;
