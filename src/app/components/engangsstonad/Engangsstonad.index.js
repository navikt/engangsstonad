import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import StepBasedForm from './../shared/step-based-form/StepBasedForm';
import Route from './../../util/routing/route.component';

import './engangsstonad.less';

type Props = {
    routes: PropTypes.array,
    egenerklaring: boolean,
    bekreftOpplysninger: boolean
}

export const EngangsstonadIndex = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (<Route {...route} key={route.path} />)));
        }
        return [];
    };

    const handleSubmit = (values) => {
        console.log(values);
    };

    const isNextButtonEnabled = (egenerklaring, bekreftOpplysninger) => {
        if (egenerklaring || bekreftOpplysninger) {
            return true;
        }

        return false;
    };

    const routes = renderRoutes();
    return (
        <StepBasedForm
            nextButtonEnabled={isNextButtonEnabled(props.egenerklaring, props.bekreftOpplysninger)}
            onSubmit={handleSubmit}
            routes={routes}
            title="Søknad om engangsstønad"
        />
    );
};

const selector = formValueSelector('engangsstonad');

const mapStateToProps = (state) => ({
    egenerklaring: selector(state, 'egenerklaring'),
    bekreftOpplysninger: selector(state, 'bekreftOpplysninger')
});

export default connect(mapStateToProps)(reduxForm({
    form: 'engangsstonad'
})(EngangsstonadIndex));
