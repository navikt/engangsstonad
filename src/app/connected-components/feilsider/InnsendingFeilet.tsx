import * as React from 'react';
import '../../styles/engangsstonad.less';
import Feilside from 'components/feilside/Feilside';
import getMessage from 'util/i18n/i18nUtils';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { CommonState } from 'reducers/commonReducer';
import { DispatchProps } from '../../redux/types';

interface StateProps {
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const InnsendingFeilet: React.StatelessComponent<Props> = (props: Props) => {
    const { intl } = props;
    return (
        <Feilside
            dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
            tittel={getMessage(intl, 'intro.innsendingFeilet.tittel')}
            ingress={getMessage(intl, 'intro.innsendingFeilet.ingress')}
            illustrasjon={{
                tittel: getMessage(intl, 'intro.innsendingFeilet.bobletittel'),
                tekst: getMessage(intl, 'intro.innsendingFeilet.bobletekst'),
                veileder: {
                    ansikt: 'skeptisk'
                }
            }}
        />
    );
};

const mapStateToProps = (state: { commonReducer: CommonState }) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(injectIntl(InnsendingFeilet));
