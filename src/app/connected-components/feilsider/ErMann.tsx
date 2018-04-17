import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import getMessage from '../../util/i18n/i18nUtils';
import Person from '../../types/domain/Person';
import { DispatchProps } from 'app/redux/types';
import { ApiReducerState } from 'reducers/apiReducer';
import { CommonState } from 'reducers/commonReducer';
import Feilside from 'components/feilside/Feilside';
import { setLanguage } from 'actions/common/commonActionCreators';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    language: string;
}

const URL_SØKNADSVALG = 'https://tjenester.nav.no/soknadforeldrepenger/app/start#/soknadsvalg';

type Props = StateProps & DispatchProps & InjectedIntlProps;

export const ErMann: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <Feilside
                containerId="js-erMann"
                dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
                tittel={getMessage(intl, 'intro.standard.tittel')}
                ingress={getMessage(intl, 'intro.standard.ingress')}
                illustrasjon={{
                    tittel: getMessage(intl, 'intro.standard.bobletittel', {
                        name: person.fornavn
                    }),
                    tekst: getMessage(intl, 'intro.erMann.bobletekst'),
                    lenke: {
                        url: URL_SØKNADSVALG,
                        tekst: getMessage(intl, 'intro.erMann.boblelenketekst')
                    }
                }}
                language={props.language}
                setLanguage={(languageCode: string) => props.dispatch(setLanguage(languageCode))}
            />
        );
    }

    return null;
};

const mapStateToProps = (state: { apiReducer: ApiReducerState; commonReducer: CommonState }) => ({
    person: state.apiReducer.person,
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(injectIntl(ErMann));
