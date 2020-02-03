import * as React from 'react';
import { Feil } from 'components/skjema-input-element/types';
import classNames from 'classnames';

interface Props {
    feil?: Feil;
}

const SkjemaelementFeilmelding: React.StatelessComponent<Props> = ({ feil }) => (
    <div role="alert" aria-live="assertive">
        {feil && <div className={classNames('skjemaelement__feilmelding', 'typo-feilmelding')}>{feil.feilmelding}</div>}
    </div>
);

export default SkjemaelementFeilmelding;
