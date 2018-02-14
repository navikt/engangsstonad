import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { injectIntl, InjectedIntlProps } from 'react-intl';
const { Normaltekst } = require('nav-frontend-typografi');
import { ISODateToMaskedInput } from '../../../util/date/dateUtils';
import getMessage from '../../../util/i18n/i18nUtils';
import { utlandsopphold } from './types';
import './countryPicker.less';

interface OwnProps {
    visit: utlandsopphold;
}

type Props = OwnProps & InjectedIntlProps;

const CountryListSummaryElement: React.StatelessComponent<Props>  = (props) => {
    const { land, startDato, sluttDato } = props.visit;

    return (
        <div className="countrySummaryElement">
            <span
                className={`countrySummaryElement__flagIcon flag-icon flag-icon-${land.toLowerCase()}`}
            />
            <div className="countrySummaryElement__textWrapper">
                <Normaltekst className="countrySummaryElement__country">
                    {countries.getName(land, 'nb')}
                </Normaltekst>
                <Normaltekst className="countrySummaryElement__date">
                    {getMessage(props.intl, 'standard.text.fromTo', {
                        from: ISODateToMaskedInput(startDato),
                        to: ISODateToMaskedInput(sluttDato)
                    })}
                </Normaltekst>
            </div>
        </div>
    );
};
export default injectIntl(CountryListSummaryElement);
