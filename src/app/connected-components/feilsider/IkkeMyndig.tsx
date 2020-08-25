import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Person from '../../types/domain/Person';

import { DispatchProps } from 'common/redux/types';
import { ApiState } from 'reducers/apiReducer';
import { CommonState } from 'reducers/commonReducer';

import Feilside from 'components/feilside/Feilside';
import { setLanguage } from 'actions/common/commonActionCreators';
import { lenker } from 'util/lenker';
import { Language } from 'intl/IntlProvider';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    language: Language;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <Feilside
                containerId="js-ikkeMyndig"
                dokumenttittel={getMessage(intl, 'intro.standard.dokumenttittel')}
                tittel={getMessage(intl, 'intro.standard.tittel')}
                ingress={getMessage(intl, 'intro.standard.ingress')}
                illustrasjon={{
                    tittel: getMessage(intl, 'intro.standard.bobletittel', {
                        name: person.fornavn.toLowerCase(),
                    }),
                    tekst: getMessage(intl, 'intro.under18.bobletekst'),
                    lenke: {
                        url: lenker.papirsøknad,
                        tekst: getMessage(intl, 'intro.under18.boblelenketekst'),
                    },
                }}
                language={props.language}
                setLanguage={(language: Language) => props.dispatch(setLanguage(language))}
            />
        );
    }
    return null;
};

const mapStateToProps = (state: { apiReducer: ApiState; commonReducer: CommonState }) => ({
    person: state.apiReducer.person,
    language: state.commonReducer.language,
});

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
