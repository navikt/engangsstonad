// @flow
import React from 'react';

import renderChildRoutes from './../../util/routing';
import StepBasedForm from './../shared/step-based-form/StepBasedForm';

import './engangsstonad.less';

type Props = {
    routes: Array<Object>
}

const EngangsstonadIndex = (props: Props) => (
    <div className="engangsstonad">
        <StepBasedForm
            nextButtonEnabled
            routes={(props.routes && renderChildRoutes(props.routes)) || []}
            title="Søknad om engangsstønad"
        />
    </div>
);

export default EngangsstonadIndex;
