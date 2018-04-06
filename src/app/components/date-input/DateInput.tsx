import * as React from 'react';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import { Feil } from 'components/skjema-input-element/types';
import Datovelger, { Props as DatovelgerProps } from 'datovelger';

export interface Props extends DatovelgerProps {
    label: string | React.ReactNode;
    feil?: Feil;
}

export class DateInput extends React.Component<Props, {}> {
    render() {
        const { label, feil, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <Datovelger {...rest} />
            </SkjemaInputElement>
        );
    }
}
export default DateInput;
