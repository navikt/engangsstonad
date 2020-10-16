import React from 'react';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import { Feil } from 'components/skjema-input-element/types';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import { connect } from 'react-redux';
import { Språkkode } from 'intl/types';
import { AppState } from 'reducers/reducers';

interface Props extends DatovelgerProps {
    label: string | React.ReactNode;
    feil?: Feil;
    språkkode: Språkkode;
}

const DateInput: React.FunctionComponent<Props> = ({ label, feil, språkkode, ...rest }) => {
    return (
        <SkjemaInputElement feil={feil} label={label}>
            <Datovelger {...rest} locale={språkkode} inputProps={{ placeholder: 'dd.mm.åååå' }} />
        </SkjemaInputElement>
    );
};

const mapStateToProps = (state: AppState) => ({
    språkkode: state.commonReducer.språkkode,
});

export default connect(mapStateToProps)(DateInput);
