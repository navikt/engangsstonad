import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';

import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';
import { Language } from '../../../intl/IntlProvider';

import './utenlandsoppholdOppsummeringList.less';

interface Props {
    utenlandsoppholdListe: Utenlandsopphold[];
    language: Language;
}

const UtenlandsoppholdOppsummeringList: React.StatelessComponent<Props> = ({ utenlandsoppholdListe, language }) => {
    return (
        <ul>
            {utenlandsoppholdListe.map(({ land, tidsperiode }) => (
                <li className={classnames('countryListElement')}>
                    <div className="countryListElement__country">{countries.getName(land, language)}</div>
                    <div className="countryListElement__date">
                        <FormattedMessage
                            id="standard.text.fromTo"
                            values={{
                                from: tidsperiode.fom,
                                to: tidsperiode.tom
                            }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default UtenlandsoppholdOppsummeringList;
