import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import classnames from 'classnames';
import SkjemaelementFeilmelding from './SkjemaelementFeilmelding';
import { Feil } from 'components/skjema-input-element/types';

export interface Props {
    label: string | React.ReactNode;
    feil?: Feil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined
            })}
        >
            <label className="skjemaelement__label" htmlFor={inputId}>
                {label}
            </label>
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined
                })}
            >
                {children}
            </div>
            <SkjemaelementFeilmelding feil={feil} />
        </div>
    );
};

export default SkjemaInputElement;
