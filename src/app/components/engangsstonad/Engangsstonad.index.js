import React from 'react';

import PropTypes from 'prop-types';

import StepBasedForm from './../shared/step-based-form/StepBasedForm';
import Route from './../../util/routing/route.component';

type Props = {
    routes: PropTypes.array
}

const Engangsstonad = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (<Route {...route} key={route.path} />)));
        }
        return [];
    };

    const routes = renderRoutes();

    return (
        <StepBasedForm routes={routes} title="Søknad for engangsstønad" />
    );
};


export default Engangsstonad;
