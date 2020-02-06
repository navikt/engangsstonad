import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Feilside from 'components/feilside/Feilside';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, WrappedComponentProps } from 'react-intl';
import { CommonState } from 'reducers/commonReducer';
import { lenker } from 'util/lenker';
import { Language } from 'intl/IntlProvider';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    language: Language;
}

interface InnsendingFeiletProps {
    error?: any;
};

type Props = InnsendingFeiletProps & StateProps & WrappedComponentProps;
const InnsendingFeilet: React.StatelessComponent<Props> = (props: Props) => {
    const { error, intl } = props;
    const errorMessage =
        error && error.status === 413 && error.data && error.data.messages ? error.data.messages : undefined;

    return (
        <Feilside
            dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
            tittel={getMessage(intl, 'intro.innsendingFeilet.tittel')}
            ingress={
                errorMessage ? (
                    errorMessage
                ) : (
                    <FormattedMessage
                        id="intro.innsendingFeilet.ingress"
                        values={{
                            lenke: (
                                <Lenke href={lenker.brukerstøtte}>
                                    {getMessage(intl, 'intro.innsendingFeilet.ingress.lenketekst')}
                                </Lenke>
                            )
                        }}
                    />
                )
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
