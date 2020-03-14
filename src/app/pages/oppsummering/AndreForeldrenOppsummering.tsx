import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import { Language } from 'intl/IntlProvider';

import '../../styles/engangsstonad.less';
import getMessage from 'common/util/i18nUtils';

interface Props {
    annenForelder: AnnenForelder;
    language: Language;
}

const AndreForeldrenOppsummering: React.StatelessComponent<Props & WrappedComponentProps> = ({
    annenForelder,
    intl,
    language
}) => {
    const { navn, fnr, utenlandskFnr, bostedsland, kanIkkeOppgis } = annenForelder;

    const fnrLabel = utenlandskFnr
        ? getMessage(intl, 'oppsummering.text.utenlandskfødselsnummer')
        : getMessage(intl, 'oppsummering.text.fødselsnummer');
    const fnrText = fnr ? fnr : 'som ikke er oppgitt';

    return (
        <div className="blokk-m">
            {kanIkkeOppgis && <Element>{getMessage(intl, 'spørsmål.kanIkkeOppgis')}</Element>}
            {!kanIkkeOppgis && navn && (
                <DisplayTextWithLabel
                    key="annenForelderNavn"
                    label={getMessage(intl, 'annenForelder.label.navn')}
                    text={navn}
                />
            )}
            {(fnr || utenlandskFnr) && (
                <DisplayTextWithLabel key="annenForelderFødselsnummer" label={fnrLabel} text={fnrText} />
            )}
            {utenlandskFnr && bostedsland && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'annenForelder.label.bostedsland')}
                    text={countries.getName(bostedsland, language)}
                />
            )}
        </div>
    );
};
export default injectIntl(AndreForeldrenOppsummering);
