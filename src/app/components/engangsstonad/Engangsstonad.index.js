// @flow
import React from 'react';
import { connect } from 'react-redux';

import Route from './../../util/routing/route.component';
import StepBasedForm from './../shared/step-based-form/StepBasedForm';

import './engangsstonad.less';

type Props = {
    routes: Array<Object>,
    approvedConditions: boolean
}

export const EngangsstonadIndex = (props: Props) => {
    const renderRoutes = () => {
        if (props.routes) {
            return (props.routes.map((route) => (
                <Route
                    component={route.component}
                    path={`${props.match.path}/${route.subpath}`}
                    key={`${props.match.path}/${route.subpath}`}
                />)));
        }
        return [];
    };

    return (
        <div className="engangsstonad">
            <StepBasedForm
                nextButtonEnabled={props.approvedConditions}
                routes={renderRoutes()}
                title="Søknad om engangsstønad"
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    approvedConditions: state.engangsstonadReducer.approvedConditions,
    confirmedInformation: state.engangsstonadReducer.confirmedInformation
});

export default connect(mapStateToProps)(EngangsstonadIndex);
