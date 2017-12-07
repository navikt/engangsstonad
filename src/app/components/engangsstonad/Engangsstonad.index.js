import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import StepBasedForm from './../shared/step-based-form/StepBasedForm';
import Route from './../../util/routing/route.component';

type Props = {
    routes: PropTypes.array,
    egenerklaring: boolean
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
        <StepBasedForm
            nextButtonEnabled={props.egenerklaring}
            onSubmit={handleSubmit}
            routes={routes}
            title="Søknad om engangsstønad"
        />
    );
};

const selector = formValueSelector('engangsstonad');

export default connect((state) => ({
    egenerklaring: selector(state, 'egenerklaring')
}))(reduxForm({
    form: 'engangsstonad'
})(EngangsstonadIndex));
