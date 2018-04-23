import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Feilside from 'components/feilside/Feilside';
import getMessage from 'util/i18n/i18nUtils';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { CommonState } from 'reducers/commonReducer';
import { DispatchProps } from '../../redux/types';

import '../../styles/engangsstonad.less';

interface StateProps {
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const URL_BRUKERSTØTTE = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749';

const InnsendingFeilet: React.StatelessComponent<Props> = (props: Props) => {
    const { intl } = props;
    return (
        <Feilside
            dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
            tittel={getMessage(intl, 'intro.innsendingFeilet.tittel')}
            ingress={
                <FormattedMessage
                    id="intro.innsendingFeilet.ingress"
                    values={{
                        lenke: <Lenke href={URL_BRUKERSTØTTE}>{getMessage(intl, 'intro.innsendingFeilet.ingress.lenketekst')}</Lenke>
                    }}
                />
            }
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
