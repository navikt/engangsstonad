import React, { Component } from 'react';
import PT from 'prop-types';

import { FeilOppsummeringBoks } from './';

class ValidForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            valid: true,
            failedSubmit: false
        };

        this.components = [];
        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext() {
        return {
            validForm: {
                register: this.registerComponent.bind(this),
                unregister: this.unRegisterComponent.bind(this),
                onChange: this.onChange.bind(this),
                onBlur: this.onBlur.bind(this)
            }
        };
    }

    onChange(e, component) {
        if (this.state.failedSubmit) {
            this.validateOne(component);
        }
    }

    onBlur(e, component) {
        if (this.state.failedSubmit) {
            this.validateOne(component);
        }
    }

    onSubmit(e) {
      e.preventDefault();
        if (this.validateAll()) {
            if (this.props.onSubmit) {
                this.props.onSubmit(e);
            }
        } else {
            this.setState({
                failedSubmit: true
            });
        }
    }

    validateOne(component) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            setTimeout(() => {
              const results = this.state.results.slice();
              const fieldResult = this.components[index].validate();
              results[index] = fieldResult;
              const valid = results.every((result) => result.valid === true);

              this.setState({
                  results,
                  valid,
                  failedSubmit: this.state.failedSubmit && !valid
              });
            });
        }
    }

    validateAll() {
        const results = this.components.map((component) => component.validate());
        const valid = results.every((result) => result.valid === true);

        this.setState({
            results: results.slice(),
            valid,
            failedSubmit: this.state.failedSubmit && !valid
        });

        return valid;
    }

    registerComponent(component) {
        if (this.components.indexOf(component) === -1) {
            this.components.push(component);
        }
    }

    unRegisterComponent(component) {
        // Fjern komponent fra komponent-listen
        const index = this.components.indexOf(component);
        this.components.splice(index, 1);

        // Fjern resultatene vi tidligere har lagret for komponenten
        const results = this.state.results.slice();
        results.splice(index, 1);

        // Sjekk om skjemaet er gyldig (valig)
        const valid = results.every((result) => result.valid === true);

        // Oppdater state
        this.setState({
            results,
            valid
        });
    }

    mapResultsToErrorSummary() {
        return this.state.results.filter((result) => !result.valid).map((result) => ({
            name: result.name,
            text: result.tests.find((test) => !test.verdict).failText
        }));
    }

    render() {
        const { onSubmit, noSummary, summaryTitle, ...other } = this.props;
        let summaryBox;
        if (this.state.failedSubmit && !this.state.valid && !noSummary) {
            summaryBox = (
                <FeilOppsummeringBoks title={summaryTitle} show errors={this.mapResultsToErrorSummary()} />
            );
        }

        return (
            <form onSubmit={this.onSubmit} {...other}>
                {summaryBox}
                {this.props.children}
            </form>
        );
    }
}

ValidForm.childContextTypes = {
    validForm: PT.object
};

ValidForm.propTypes = {
    /**
    * Valgfri event handler på submit
    */
    onSubmit: PT.func,
    /**
    * Markup
    */
    children: PT.node,
    /**
    * Brukes som overskrift på feil-oppsummering-boks hvis noSummary ikke er true
    */
    summaryTitle: PT.string,
    /**
    * Skru av/på at skjemaet rendrer en oppsummerings-boks over valideringsfeil
    */
    noSummary: PT.bool
};

ValidForm.defaultProps = {
    onSubmit: undefined,
    children: undefined,
    summaryTitle: undefined,
    noSummary: false
};

export default ValidForm;
