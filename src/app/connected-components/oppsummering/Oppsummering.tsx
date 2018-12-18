import * as React from 'react';
import { connect } from 'react-redux';
import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
import { fullNameFormat } from 'util/formats/formatUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AndreForeldrenOppsummering from './AndreForeldrenOppsummering';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from 'app/types/domain/InformasjonOmUtenlandsopphold';
import OppsummeringBarn from './../oppsummering/BarnOppsummering';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import SøkersPersonalia from 'components/søkers-personalia/SøkersPersonalia';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import './oppsummering.less';

interface StateProps {
    annenForelder: AnnenForelder;
    barn: FodtBarn & UfodtBarn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    person: Person;
}

type Props = StateProps & InjectedIntlProps;

const Oppsummering = ({
    annenForelder,
    barn,
    informasjonOmUtenlandsopphold,
    person,
    intl,
}: Props) => {
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
                    navn={fullNameFormat(
                        person.fornavn,
                        person.mellomnavn,
                        person.etternavn
                    ).toLowerCase()}
                    personnummer={person.fnr}
                />
            </div>
            <Oppsummeringspunkt tittel={oppsummeringBarnTittel}>
                <OppsummeringBarn barn={barn} />
            </Oppsummeringspunkt>

            {Object.keys(annenForelder).length > 0 && (
                <AndreForeldrenOppsummering annenForelder={annenForelder} />
            )}

            <Oppsummeringspunkt tittel={getMessage(intl, 'medlemmskap.sectionheading')}>
                <UtenlandsoppholdOppsummering
                    informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                    erBarnetFødt={barn.erBarnetFødt}
                />
            </Oppsummeringspunkt>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    annenForelder: state.soknadReducer.annenForelder,
    barn: state.soknadReducer.barn,
    informasjonOmUtenlandsopphold: state.soknadReducer.informasjonOmUtenlandsopphold,
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Oppsummering));
