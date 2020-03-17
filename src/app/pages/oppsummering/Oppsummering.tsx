import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import { Søkerinfo } from 'app/types/domain/Søkerinfo';
import { EngangssoknadSoknadDto } from 'app/types/domain/EngangsstonadSoknad';
import getMessage from 'common/util/i18nUtils';
import SøkersPersonalia from 'components/søkers-personalia/SøkersPersonalia';
import { Language } from 'intl/IntlProvider';
import { fullNameFormat } from 'util/formats/formatUtils';

import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import AndreForeldrenOppsummering from './AndreForeldrenOppsummering';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OppsummeringBarn from './BarnOppsummering';
import { AppState } from 'reducers/index';

import './oppsummering.less';

interface StateProps {
    søkerinfo: Søkerinfo;
    language: Language;
}

interface OwnProps {
    søknad: EngangssoknadSoknadDto;
}

type Props = OwnProps & StateProps & WrappedComponentProps;
const Oppsummering: React.StatelessComponent<Props> = ({ søknad, søkerinfo, language, intl }) => {
    
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
                    kjønn={søkerinfo.kjønn}
                    navn={fullNameFormat(søkerinfo.fornavn, søkerinfo.mellomnavn, søkerinfo.etternavn).toLowerCase()}
                    personnummer={søkerinfo.fnr}
                />
            </div>

            <Oppsummeringspunkt tittel={oppsummeringBarnTittel}>
                <OppsummeringBarn barn={barn as any} />
            </Oppsummeringspunkt>

            {søkerinfo.ikkeNordiskEøsLand && (
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
    søkerinfo: state.apiReducer.søkerinfo!,
    language: state.commonReducer.language
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Oppsummering));
