import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AnnenForelder from 'app/types/domain/AnnenForelder';

import '../../styles/engangsstonad.less';

interface Props {
    annenForelder: AnnenForelder;
}

const AndreForeldrenOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { navn, fnr, utenlandskFnr, bostedsland, kanIkkeOppgis } = props.annenForelder;

    const fnrLabel = utenlandskFnr ? getMessage(intl, 'oppsummering.text.utenlandskfødselsnummer') : getMessage(intl, 'oppsummering.text.fødselsnummer');
    const fnrText = fnr ? fnr : 'som ikke er oppgitt';

    return (
        <div>
            <Ingress className="engangsstonadOppsumering__underTitle">
                {getMessage(intl, 'annenForelder.sectionheading')}
            </Ingress>
            {kanIkkeOppgis &&
                <DisplayTextWithLabel
                    label={getMessage(intl, 'annenForelder.label.navn')}
                    text={getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}
                />
            }
            {!kanIkkeOppgis && navn  && 
                <DisplayTextWithLabel
                    key="annenForelderNavn"
                    label={getMessage(intl, 'annenForelder.label.navn')}
                    text={navn}
                />
            }
            { (fnr || utenlandskFnr) &&
                <DisplayTextWithLabel
                    key="annenForelderFødselsnummer"
                    label={fnrLabel}
                    text={fnrText}
                />
            }
            {utenlandskFnr && bostedsland &&
                <DisplayTextWithLabel
                    label={getMessage(intl, 'annenForelder.label.bostedsland')}
                    text={countries.getName(bostedsland, 'nb')}
                />
            }
        </div>
    );
};
export default injectIntl(AndreForeldrenOppsummering);
