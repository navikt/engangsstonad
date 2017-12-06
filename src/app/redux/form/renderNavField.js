import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

const renderNavField = (WrappedNavFieldComponent) => {
    class FieldComponent extends Component {
        constructor() {
            super();
            this.formatError = this.formatError.bind(this);
        }

        formatError(submitFailed, error) {
            if (submitFailed && error) {
                return { feilmelding: this.props.intl.formatMessage(...error) };
            }
            return undefined;
        }

        render() {
            const {
                // eslint-disable-next-line no-unused-vars
                input, meta: { submitFailed, error }, intl, ...otherProps
            } = this.props;

            const fieldProps = {
                id: input.name,
                feil: this.formatError(submitFailed, error)
            };

            return <WrappedNavFieldComponent {...fieldProps} {...input} {...otherProps} />;
        }
    }

    FieldComponent.propTypes = {
        input: PropTypes.shape(fieldInputPropTypes).isRequired,
        meta: PropTypes.shape({
            ...fieldMetaPropTypes,
            error: PropTypes.any
        }).isRequired,
        intl: intlShape.isRequired
    };

    const FieldComponentWithIntl = injectIntl(FieldComponent);

    FieldComponentWithIntl.WrappedComponent = FieldComponent;

    return FieldComponentWithIntl;
};

export default renderNavField;
