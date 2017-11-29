import React from 'react';
import PropTypes from 'prop-types';
import { Sidetittel } from 'nav-frontend-typografi';
import StepBasedForm from './../shared/step-based-form/StepBasedForm';
import Route from './../../util/routing/route.component';
import NAVLogo from '../shared/logo/Logo';

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
        <div>
            <Sidetittel>Søknad om engangsstønad</Sidetittel>
            <NAVLogo />
            <StepBasedForm routes={routes} />
        </div>
    );
};


export default Engangsstonad;
