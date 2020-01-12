import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import getMessage from 'common/util/i18nUtils';
import Person from '../../types/domain/Person';
import { DispatchProps } from 'common/redux/types';
import { ApiState } from 'reducers/apiReducer';
import { CommonState } from 'reducers/commonReducer';
import Feilside from 'components/feilside/Feilside';
import { setLanguage } from 'actions/common/commonActionCreators';
import { lenker } from 'util/lenker';
import { Language } from 'intl/IntlProvider';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    language: Language;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const ErMann: React.StatelessComponent<Props> = (props: Props) => {
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
                        name: person.fornavn.toLowerCase()
                    }),
                    tekst: getMessage(intl, 'intro.erMann.bobletekst'),
                    lenke: {
                        url: lenker.søknadsveileder,
                        tekst: getMessage(intl, 'intro.erMann.boblelenketekst')
                    }
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
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(injectIntl(ErMann));
