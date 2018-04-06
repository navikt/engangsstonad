import * as React from 'react';
import { Avgrensninger } from '../types';
import { formatDateInputValue } from '../utils';

export interface Props {
    id: string;
    avgrensninger: Avgrensninger;
}

const AvgrensningerInfo: React.StatelessComponent<Props> = ({ id, avgrensninger }) => {
    if (!avgrensninger.minDato && !avgrensninger.maksDato) {
        return null;
    }

    let msg = '';
    const fraDato = formatDateInputValue(avgrensninger.minDato);
    const tilDato = formatDateInputValue(avgrensninger.maksDato);
    if (avgrensninger.minDato && avgrensninger.maksDato) {
        msg = `Dato må være mellom "${fraDato}" og "${tilDato}". `;
    } else {
        if (avgrensninger.minDato) {
            msg = `Fra ${fraDato}. `;
        }
        if (avgrensninger.maksDato) {
            msg = `Til ${tilDato}. `;
        }
    }
    if (avgrensninger.helgedagerIkkeTillatt) {
        msg = `${msg}Lørdager og søndager er ikke valgbare. `;
    }

    return (
        <p className="sr-only" id={id}>
            {msg}
        </p>
    );
};

export default AvgrensningerInfo;
