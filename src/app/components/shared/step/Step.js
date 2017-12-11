import React from 'react';
import PropTypes from 'prop-types';
import './step.less';

const Step = (props) => (
    <div className="step">
        { props.children }
    </div>
);

Step.propTypes = {
    children: PropTypes.node.isRequired
};

export default Step;
