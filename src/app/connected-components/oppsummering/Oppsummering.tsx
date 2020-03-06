import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Person from 'app/types/domain/Person';
import { EngangssoknadSoknadDto } from 'app/types/domain/EngangsstonadSoknad';
import getMessage from 'common/util/i18nUtils';
import SøkersPersonalia from 'components/søkers-personalia/SøkersPersonalia';
import { AppState } from 'reducers/index';
import { Language } from 'intl/IntlProvider';
import { fullNameFormat } from 'util/formats/formatUtils';

import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import AndreForeldrenOppsummering from './AndreForeldrenOppsummering';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OppsummeringBarn from './../oppsummering/BarnOppsummering';

import './oppsummering.less';

interface StateProps {
    person: Person;
    language: Language;
}

interface OwnProps {
    søknad: EngangssoknadSoknadDto;
}

type Props = OwnProps & StateProps & WrappedComponentProps;
const Oppsummering: React.StatelessComponent<Props> = ({ søknad, person, language, intl }) => {
    
    const { barn, annenForelder, informasjonOmUtenlandsopphold } = søknad;    
    const oppsummeringBarnTittel = getMessage(intl, 'oppsummering.text.relasjonTilBarnet', {
        antallBarn:
            barn.antallBarn && barn.antallBarn > 1
                ? getMessage(intl, 'medlemmskap.text.barnFlertall')
                : getMessage(intl, 'medlemmskap.text.barnEntall')
    });

    return (
        <div className="oppsummering blokk-m">
            <div className="blokk-m">
                <SøkersPersonalia
                    kjønn={person.kjønn}
                    navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn).toLowerCase()}
                    personnummer={person.fnr}
                />
            </div>

            <Oppsummeringspunkt tittel={oppsummeringBarnTittel}>
                <OppsummeringBarn barn={barn as any} />
            </Oppsummeringspunkt>

            {person.ikkeNordiskEøsLand && (
                <Oppsummeringspunkt tittel={getMessage(intl, 'annenForelder.sectionheading')}>
                    <AndreForeldrenOppsummering annenForelder={annenForelder} language={language} />
                </Oppsummeringspunkt>
            )}

            <Oppsummeringspunkt tittel={getMessage(intl, 'medlemmskap.sectionheading')}>
                <UtenlandsoppholdOppsummering
                    informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                    barn={barn}
                    langauge={language}
                />
            </Oppsummeringspunkt>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!,
    language: state.commonReducer.language
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Oppsummering));
