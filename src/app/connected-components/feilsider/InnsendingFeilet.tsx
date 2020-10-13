import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Feilside from 'components/feilside/Feilside';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { CommonState } from 'reducers/commonReducer';
import { lenker } from 'util/lenker';
import { Språkkode } from 'intl/types';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    språkkode: Språkkode;
}

interface InnsendingFeiletProps {
    error?: any;
}

type Props = InnsendingFeiletProps & StateProps;
const InnsendingFeilet: React.FunctionComponent<Props> = ({ error }) => {
    const intl = useIntl();
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
                            ),
                        }}
                    />
                )
            }
            illustrasjon={{
                tittel: getMessage(intl, 'intro.innsendingFeilet.bobletittel'),
                tekst: getMessage(intl, 'intro.innsendingFeilet.bobletekst'),
                veileder: {
                    ansikt: 'skeptisk',
                },
            }}
        />
    );
};

const mapStateToProps = (state: { commonReducer: CommonState }) => ({
    språkkode: state.commonReducer.språkkode,
});

export default connect(mapStateToProps)(InnsendingFeilet);
