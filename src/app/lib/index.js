/* eslint-disable */
import React, { Component } from 'react';
import PT from 'prop-types';

import { Input, Textarea, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import DateInput from './../components/shared/date-input/DateInput';

class ValidBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
            valid: true,
            hasBlurred: false,
            optional: this.props.optional
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
        if (this.context.validForm) {
            this.context.validForm.register(this);
        }
    }

    componentWillUnmount() {
        if (this.context.validForm) {
            this.context.validForm.unregister(this);
        }
    }

    onChange(e) {
        if (this.state.hasBlurred) {
          setTimeout(() => {
              this.validate();
          })
        }
        if (this.context.validForm) {
          this.context.validForm.onChange(e, this);
        }

        if (this.props.onChange) {
          this.props.onChange(e);
        }
    }

    onBlur(e) {
        this.setState({
            hasBlurred: true
        });

        setTimeout(() => {
          this.validate();
        });


        if (this.context.validForm) {
          this.context.validForm.onBlur(e, this);
        }

        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
    }

    getFirstFailedVerdict() {
        return this.state.tests.find((test) => !test.verdict);
    }

    validate() {
        const result = this.runValidation();

        if (this.props.onValidate) {
            this.props.onValidate(result);
        }

        return result;
    }

    runValidation() {
        if (!this.props.validators || !this.props.validators.length) return;

        let valid = true;
        const testsCopy = this.props.validators.map((validator) => {
            let validatorResult = {
                verdict: validator.test(this.element),
                failText: validator.failText
            };

            if (!validatorResult.verdict) {
                valid = false;
            }
            return validatorResult;
        });

        this.setState({
            tests: testsCopy.slice(),
            valid
        });

        // eslint-disable-next-line consistent-return
        return {
            name: this.props.name,
            tests: testsCopy.slice(),
            valid
        };
    }

    render() {
        const {
            // eslint-disable-next-line no-unused-vars
            component, onChange, onBlur, onValidate, validateOnChange, validateOnBlur, feil, optional, ...other
        } = this.props;
        const failedVerdict = (!this.state.valid) ? { feilmelding: this.getFirstFailedVerdict().failText } : undefined;

        const elementRef = {};
        switch (component) { // eslint-disable-line default-case
            case Input: elementRef.inputRef = (node) => { this.element = node; }; break;
            case Select: elementRef.selectRef = (node) => { this.element = node; }; break;
            case Textarea: elementRef.textareaRef = (node) => { this.element = node; }; break;
            case DateInput: elementRef.ref = (node) => { this.element = node; }; break;
        }

        if (component === DateInput) {
          return (
            <this.props.component
              onChange={this.onChange}
              onBlur={this.onBlur}
              errorMessage={failedVerdict && failedVerdict.feilmelding}
              {...other}
            />
          )
        }

        return (
            <this.props.component
                onChange={this.onChange}
                onBlur={this.onBlur}
                feil={feil || failedVerdict}
                {...other}
            />
        );
    }
}

ValidBase.contextTypes = {
    validForm: PT.object.isRequired
};

ValidBase.propTypes = {
    component: PT.oneOf([Input, Textarea, Select, DateInput, SkjemaGruppe]).isRequired,
    name: PT.string,
    onChange: PT.func,
    onBlur: PT.func,
    id: PT.string,
    onValidate: PT.func,
    validateOnChange: PT.bool,
    validateOnBlur: PT.bool,
    feil: PT.shape(),
    validators: PT.arrayOf(PT.shape({
        test: PT.func.isRequired,
        failText: PT.string.isRequired
    })).isRequired,
    optional: PT.bool
};

ValidBase.defaultProps = {
    name: undefined,
    onChange: undefined,
    onBlur: undefined,
    onValidate: undefined,
    validateOnChange: false,
    validateOnBlur: true,
    feil: undefined,
    optional: false
};

export default ValidBase;

export { default as ValidForm } from './valid-form';
export { default as ValidInput } from './valid-input';
export { default as ValidGroup } from './valid-group';
export { default as ValidDateInput } from './valid-date-input';
export { default as FeilOppsummeringBoks } from './feil-oppsummering-boks';
/* eslint-enable */
