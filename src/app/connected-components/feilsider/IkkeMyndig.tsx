import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import Person from '../../types/domain/Person';
import { DispatchProps } from 'common/redux/types';
import { ApiState } from 'reducers/apiReducer';
import { CommonState } from 'reducers/commonReducer';
import Feilside from 'components/feilside/Feilside';
import { setLanguage } from 'actions/common/commonActionCreators';
import { lenker } from 'util/lenker';
import { Språkkode } from 'intl/types';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    språkkode: Språkkode;
}

type Props = StateProps & DispatchProps;

const IkkeMyndig: React.FunctionComponent<Props> = ({ person, språkkode, dispatch }) => {
    const intl = useIntl();

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
                språkkode={språkkode}
                setLanguage={(språkkodeValue: Språkkode) => dispatch(setLanguage(språkkodeValue))}
            />
        );
    }
    return null;
};

const mapStateToProps = (state: { apiReducer: ApiState; commonReducer: CommonState }) => ({
    person: state.apiReducer.person,
    språkkode: state.commonReducer.språkkode,
});

export default connect(mapStateToProps)(IkkeMyndig);
