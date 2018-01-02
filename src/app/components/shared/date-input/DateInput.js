import React, { Component } from 'react';
import PT from 'prop-types';
import MaskedInput from 'react-maskedinput';
import { Element } from 'nav-frontend-typografi';

import DatePicker from './DatePicker';
import {
    autobind,
    dateToISODate,
    erGyldigISODato,
    ISODateToDatePicker,
    datePickerToISODate,
    stopEvent
} from './dateUtil';

import './dayPicker.less';

class DateInput extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        this.container.addEventListener('focusout', this.onFocusOut);
    }

    componentWillUnmount() {
        this.container.removeEventListener('focusout', this.onFocusOut);
    }

    onFocusOut(e) {
        const { relatedTarget } = e;
        if (relatedTarget) {
            const targetErChildnode = this.container.contains(relatedTarget);
            if (!targetErChildnode) {
                this.close(false);
            }
        }
    }

    onKeyUp(e) {
        const ESCAPE_KEYCODE = 27;
        if (e.which === ESCAPE_KEYCODE) {
            this.close();
        }
    }

    onDayClick(event) {
        const isoDate = dateToISODate(new Date(event));
        this.props.onChange(isoDate);
        this.close();
    }

    onMaskedInputChange(e) {
        const inputDate = e.target.value;
        const isoDate = datePickerToISODate(inputDate);
        if (erGyldigISODato(isoDate)) {
            this.props.onChange(isoDate);
        }
    }

    toggle(e) {
        e.preventDefault();
        if (this.state.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.setState({
            isOpen: true
        });
    }

    close(settFokus = true) {
        this.setState({
            isOpen: false
        });
        if (settFokus) {
            this.toggleButton.focus();
        }
    }

    render() {
        const {
            input,
            label,
            disabled,
            tidligsteFom,
            senesteTom,
            errorMessage
        } = this.props;

        const feil = errorMessage && errorMessage;
        const { value } = input;
        const maskedInputProps = {
            ...input,
            value: erGyldigISODato(value) ? ISODateToDatePicker(value) : value
        };

        return (
            <div
                className="datovelger skjemaelement"
                ref={(container) => {
                    this.container = container;
                }}
            >
                <Element className="skjemaelement__label">
                    {label}
                </Element>

                <div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                    className="datovelger__inner"
                    tabIndex=""
                    onClick={stopEvent}
                >
                    <div className="datovelger__inputContainer">
                        <MaskedInput
                            type="tel"
                            mask="11.11.1111"
                            autoComplete="off"
                            placeholder="dd.mm.åååå"
                            id="id"
                            disabled={disabled}
                            className="skjemaelement__input input--m datovelger__input"
                            {...maskedInputProps}
                            onChange={(e) => this.onMaskedInputChange(e)}
                        />
                        <button
                            className="js-toggle datovelger__toggleDayPicker"
                            aria-label={
                                this.state.isOpen
                                    ? 'Skjul datovelger'
                                    : 'Vis datovelger'
                            }
                            ref={(toggle) => {
                                this.toggleButton = toggle;
                            }}
                            id="id"
                            disabled={disabled}
                            onKeyUp={this.onKeyUp}
                            onClick={this.toggle}
                            aria-pressed={this.erApen}
                            type="button"
                        />
                    </div>

                    {this.state.isOpen &&
                    <DatePicker
                        {...this.props}
                        ariaControls="toggle-id"
                        tidligsteFom={tidligsteFom}
                        senesteTom={senesteTom}
                        onDayClick={this.onDayClick}
                        onKeyUp={this.onKeyUp}
                        lukk={this.close}
                    />
                    }
                </div>
                <div
                    role="alert"
                    aria-live="assertive"
                    className="skjemaelement__feilmelding"
                >
                    {feil}
                </div>

            </div>
        );
    }
}

DateInput.propTypes = {
    //meta: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    //id: PT.string.isRequired,
    //feltNavn: PT.string.isRequired,
    label: PT.oneOfType([PT.string, PT.node]).isRequired,
    input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    disabled: PT.bool,
    tidligsteFom: PT.instanceOf(Date),
    senesteTom: PT.instanceOf(Date),
    errorMessage: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    onChange: PT.func.isRequired
};

DateInput.defaultProps = {
    disabled: false,
    tidligsteFom: undefined,
    senesteTom: undefined,
    errorMessage: undefined
};

export default DateInput;
