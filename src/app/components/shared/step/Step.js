import React from 'react';
import PropTypes from 'prop-types';
import styles from './step.less';

const Step = (props) => (
    <div className={styles.step}>
        { props.children }
    </div>
);

Step.propTypes = {
    children: PropTypes.node.isRequired
};

export default Step;
