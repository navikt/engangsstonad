// @flow
import React from 'react';

import Route from './../../util/routing/route.component';
import StepBasedForm from './../shared/step-based-form/StepBasedForm';

import './engangsstonad.less';

type Props = {
    routes: Array<Object>
}

export const EngangsstonadIndex = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (
                <Route
                    {...route}
                    path={`${props.match.path}/${route.subpath}`}
                    key={route.path}
                />)));
        }
        return [];
    };

    return (
        <div className="engangsstonad">
            <StepBasedForm
                nextButtonEnabled
                routes={renderRoutes()}
                title="Søknad om engangsstønad"
            />
        </div>
    );
};

export default EngangsstonadIndex;
