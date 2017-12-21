import React from 'react';
import PropTypes from 'prop-types';
import renderChildRoutes from 'util/routing';
import StepBasedForm from 'shared/step-based-form/StepBasedForm';

import './engangsstonad.less';

const EngangsstonadIndex = (props) => (
    <div className="engangsstonad">
        <StepBasedForm
            nextButtonEnabled
            routes={renderChildRoutes(props.routes) || []}
            title="Søknad om engangsstønad"
            location={props.location}
        />
    </div>
);

EngangsstonadIndex.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    location: PropTypes.PropTypes.shape({}).isRequired
};

export default EngangsstonadIndex;
