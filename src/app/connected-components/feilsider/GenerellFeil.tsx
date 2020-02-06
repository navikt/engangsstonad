import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Feilside from 'components/feilside/Feilside';
import { connect } from 'react-redux';
import { injectIntl, WrappedComponentProps, FormattedMessage } from 'react-intl';
import { CommonState } from 'reducers/commonReducer';
import { DispatchProps } from 'common/redux/types';
import { lenker } from 'util/lenker';
import { Language } from 'intl/IntlProvider';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    language: Language;
}

type Props = StateProps & DispatchProps & WrappedComponentProps;
const GenerellFeil: React.StatelessComponent<Props> = (props: Props) => {
    const { intl } = props;
    return (
        <Feilside
            dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
            tittel={getMessage(intl, 'intro.generellFeil.tittel')}
            ingress={
                <FormattedMessage
                    id="intro.generellFeil.ingress"
                    values={{
                        lenke: <Lenke href={lenker.brukerstøtte}>{getMessage(intl, 'intro.innsendingFeilet.ingress.lenketekst')}</Lenke>
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

export default connect(mapStateToProps)(injectIntl(GenerellFeil));
