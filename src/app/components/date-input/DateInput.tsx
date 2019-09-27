import * as React from 'react';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import { Feil } from 'components/skjema-input-element/types';
import { connect } from 'react-redux';
import { Language } from 'intl/IntlProvider';
import { AppState } from 'reducers/reducers';
import { DatovelgerProps } from 'nav-datovelger';

export interface Props extends DatovelgerProps {
    label: string | React.ReactNode;
    feil?: Feil;
}

interface StateProps {
    language: Language;
}

class DateInput extends React.Component<Props & StateProps, {}> {
    render() {
        const { label, feil } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                {/* <Datovelger
                    {...rest}
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                /> */}
            </SkjemaInputElement>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(DateInput);
