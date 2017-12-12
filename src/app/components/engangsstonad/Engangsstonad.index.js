// @flow
import React from 'react';

import Route from './../../util/routing/route.component';
import StepBasedForm from './../shared/step-based-form/StepBasedForm';

type Props = {
    routes: Array<Object>
}

export const EngangsstonadIndex = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (<Route {...route} key={route.path} />)));
        }
        return [];
    };

    const routes = renderRoutes();

    return (
        <div>
            <StepBasedForm
                nextButtonEnabled
                routes={routes}
                title="Søknad om engangsstønad"
            />
        </div>
    );
};

export default EngangsstonadIndex;
