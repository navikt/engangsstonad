import * as React from 'react';
import { connect } from 'react-redux';

import { fullNameFormat } from 'util/formats/formatUtils';
import { injectIntl, WrappedComponentProps} from 'react-intl';
import AndreForeldrenOppsummering from './AndreForeldrenOppsummering';
import getMessage from 'common/util/i18nUtils';
import OppsummeringBarn from './../oppsummering/BarnOppsummering';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import SøkersPersonalia from 'components/søkers-personalia/SøkersPersonalia';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import { AppState } from 'reducers/index';
import { EngangssoknadSoknadDto } from 'app/types/domain/EngangsstonadSoknad';

import './oppsummering.less';

interface StateProps {
    person: Person;
}

interface OwnProps {
    søknad: EngangssoknadSoknadDto
}

type Props = OwnProps & StateProps & WrappedComponentProps;
const Oppsummering: React.StatelessComponent<Props> = ({ søknad, person, intl }) => {
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
                    <AndreForeldrenOppsummering annenForelder={annenForelder} />
                </Oppsummeringspunkt>
            )}

            <Oppsummeringspunkt tittel={getMessage(intl, 'medlemmskap.sectionheading')}>
                <UtenlandsoppholdOppsummering
                    informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                    barn={barn}
                />
            </Oppsummeringspunkt>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Oppsummering));
