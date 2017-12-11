import React from 'react';
import PropTypes from 'prop-types';

export default class IconFromSprite extends React.Component {
    renderIcon() {
        return (
            <svg viewBox={this.props.iconRef.viewBox}>
                <use xlinkHref={`#${this.props.iconRef.id}`} />
            </svg>
        );
    }

    render() {
        return (this.renderIcon());
    }
}

IconFromSprite.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    iconRef: PropTypes.object
};
