import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface Props {
    annenForelder: AnnenForelder;
}

const AndreForeldrenOppsummering: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { navn, fnr, utenlandskFnr, bostedsland, kanIkkeOppgis } = props.annenForelder;

    const fnrLabel = utenlandskFnr
        ? getMessage(intl, 'oppsummering.text.utenlandskfødselsnummer')
        : getMessage(intl, 'oppsummering.text.fødselsnummer');
    const fnrText = fnr ? fnr : 'som ikke er oppgitt';

    return (
        <div className="blokk-m">
            {kanIkkeOppgis && <Element>{getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}</Element>}
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
                    text={countries.getName(bostedsland, 'nb')}
                />
            )}
        </div>
    );
};
export default AndreForeldrenOppsummering;
