import * as React from 'react';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import getMessage from '../../util/i18n/i18nUtils';
import Person from '../../types/domain/Person';

import { DispatchProps } from 'app/redux/types';
import { ApiReducerState } from 'reducers/apiReducer';
import { CommonState } from 'reducers/commonReducer';

import '../../styles/engangsstonad.less';
import Feilside from 'components/feilside/Feilside';
import { setLanguage } from 'actions/common/commonActionCreators';

interface StateProps {
    person: Person;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const URL_KONTAKT_NAV = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss';

const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <Feilside
                containerId="js-personIkkeFunnet"
                dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
                tittel={getMessage(intl, 'intro.standard.tittel')}
                ingress={getMessage(intl, 'intro.standard.ingress')}
                illustrasjon={{
                    tittel: getMessage(intl, 'intro.personIkkeFunnet.bobletittel'),
                    tekst: getMessage(intl, 'intro.personIkkeFunnet.bobletekst'),
                    lenke: {
                        url: URL_KONTAKT_NAV,
                        tekst: getMessage(intl, 'intro.personIkkeFunnet.boblelenketekst')
                    },
                    veileder: {
                        ansikt: 'undrende'
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

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
