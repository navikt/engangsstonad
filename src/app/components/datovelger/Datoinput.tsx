import * as React from 'react';
import { formatDateInputValue } from './utils';

export interface Props {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    onInputChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface State {
    value: string;
}

export const dateRegExp = /^(\d{1,2}).(\d{1,2}).(\d{4})$/;

const getDateFromString = (value: string) => {
    const values = value.match(dateRegExp);
    if (values && values.length === 4) {
        const year = parseInt(values[3], 10);
        const month = parseInt(values[2], 10) - 1;
        const day = parseInt(values[1], 10);
        return new Date(year, month, day);
    }
    return undefined;
};

export class Input extends React.Component<Props, State> {
    input: HTMLInputElement | null;

    constructor(props: Props) {
        super(props);
        this.focus = this.focus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.triggerDateChange = this.triggerDateChange.bind(this);
        this.state = {
            value: formatDateInputValue(props.date)
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.date !== this.props.date) {
            this.setState({
                value: formatDateInputValue(nextProps.date)
            });
        }
    }

    focus() {
        if (this.input) {
            this.input.focus();
        }
    }

    onBlur(evt: React.FocusEvent<HTMLInputElement>) {
        this.triggerDateChange();
    }

    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            this.triggerDateChange();
        }
    }

    onChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const value = evt.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(evt);
        }
        this.setState({ value });
    }

    triggerDateChange() {
        if (getDateFromString(this.state.value) !== this.props.date) {
            this.props.onDateChange(getDateFromString(this.state.value));
        }
    }

    render() {
        const { inputProps } = this.props;
        return (
            <input
                {...inputProps}
                autoComplete="off"
                autoCorrect="off"
                type="text"
                ref={c => (this.input = c)}
                value={this.state.value}
                className="nav-datovelger__input"
                maxLength={10}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
            />
        );
    }
}
export default Input;
