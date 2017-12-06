import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import StepBasedForm from './../shared/step-based-form/StepBasedForm';
import Route from './../../util/routing/route.component';

type Props = {
    routes: PropTypes.array
}

const EngangsstonadIndex = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (<Route {...route} key={route.path} />)));
        }
        return [];
    };

    const handleSubmit = (values) => {
        console.log(values);
    };

    const routes = renderRoutes();

    return (
        <StepBasedForm onSubmit={handleSubmit} routes={routes} title="Søknad om engangsstønad" />
    );
};

export default reduxForm({
    form: 'engangsstonad'
})(EngangsstonadIndex);
