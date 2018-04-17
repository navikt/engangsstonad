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

const URL_PAPIRSØKNAD =
    'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=267390&veiledertype=privatperson&method=mail';

interface StateProps {
    person: Person;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <Feilside
                dokumenttittel="NAV Engangsstønad"
                containerId="js-ikkeMyndig"
                tittel={getMessage(intl, 'intro.pageheading.ikkeMyndig')}
                ingress={getMessage(intl, 'intro.text.omES')}
                illustrasjon={{
                    tittel: getMessage(intl, 'intro.snakkeboble.overskrift', {
                        name: person.fornavn
                    }),
                    tekst: getMessage(intl, 'intro.text.under18'),
                    lenke: {
                        url: URL_PAPIRSØKNAD,
                        tekst: getMessage(intl, 'intro.text.lastNedPapirsoknad')
                    }
                }}
                language={props.language}
                setLanguage={(languageCode: string) =>
                    props.dispatch(setLanguage(languageCode))
                }
            />
        );
    }
    return null;
};

const mapStateToProps = (state: {
    apiReducer: ApiReducerState;
    commonReducer: CommonState;
}) => ({
    person: state.apiReducer.person,
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
