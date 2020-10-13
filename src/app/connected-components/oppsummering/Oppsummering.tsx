import * as React from 'react';
import { connect } from 'react-redux';
import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
import { fullNameFormat } from 'util/formats/formatUtils';
import { useIntl } from 'react-intl';
import AndreForeldrenOppsummering from './AndreForeldrenOppsummering';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from 'app/types/domain/InformasjonOmUtenlandsopphold';
import OppsummeringBarn from './../oppsummering/BarnOppsummering';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import SøkersPersonalia from 'components/søkers-personalia/SøkersPersonalia';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import { AppState } from 'reducers/reducers';

import './oppsummering.less';

interface Props {
    annenForelder: AnnenForelder;
    barn: FodtBarn & UfodtBarn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    person?: Person;
}

const Oppsummering: React.FunctionComponent<Props> = ({
    annenForelder,
    barn,
    informasjonOmUtenlandsopphold,
    person,
}) => {
    const intl = useIntl();

    if (!person) {
        return null;
    }

    const oppsummeringBarnTittel = getMessage(intl, 'oppsummering.text.relasjonTilBarnet', {
        antallBarn:
            barn.antallBarn && barn.antallBarn > 1
                ? getMessage(intl, 'medlemmskap.text.barnFlertall')
                : getMessage(intl, 'medlemmskap.text.barnEntall'),
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
                <OppsummeringBarn barn={barn} />
            </Oppsummeringspunkt>

            {Object.keys(annenForelder).length > 0 && (
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
    person: state.apiReducer.person,
    annenForelder: state.soknadReducer.annenForelder,
    barn: state.soknadReducer.barn as FodtBarn & UfodtBarn,
    informasjonOmUtenlandsopphold: state.soknadReducer.informasjonOmUtenlandsopphold,
});

export default connect<Props>(mapStateToProps)(Oppsummering);
