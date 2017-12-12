import React from 'react';
import PropTypes from 'prop-types';

export default class IconFromSprite extends React.Component {
    renderIcon(svgAttrs) {
        return (
            <svg {...svgAttrs}>
                <use xlinkHref={`#${this.props.iconRef.id}`} />
            </svg>
        );
    }

    render() {
        const svgAttrs = {
            viewbox: this.props.iconRef.viewBox,
            height: this.props.height,
            width: this.props.width
        };

        return (this.renderIcon(svgAttrs));
    }
}

IconFromSprite.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    iconRef: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number
};

IconFromSprite.defaultProps = {
    height: undefined,
    width: undefined
};
