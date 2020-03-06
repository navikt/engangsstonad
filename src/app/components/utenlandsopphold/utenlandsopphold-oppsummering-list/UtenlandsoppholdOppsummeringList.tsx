import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { FormattedMessage } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';

import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';
import { Language } from '../../../intl/IntlProvider';

import './utenlandsoppholdOppsummeringList.less';

interface Props {
    utenlandsoppholdListe: Utenlandsopphold[];
    language: Language;
}

const UtenlandsoppholdOppsummeringList: React.StatelessComponent<Props> = ({ utenlandsoppholdListe, language }) => {
    return (
        <ul className="countrySummaryList">
            {utenlandsoppholdListe.map(({ land, tidsperiode }) => (
                <li key={guid()} className={classnames('countrySummaryList__listElement')}>
                    <div className="countryListElement__country">
                        <Element>{countries.getName(land, language)}</Element>
                    </div>
                    <div className="countryListElement__date">
                        <Element>
                            <FormattedMessage
                                id="standard.text.fromTo"
                                values={{
                                    from: tidsperiode.fom,
                                    to: tidsperiode.tom
                                }}
                            />
                        </Element>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default UtenlandsoppholdOppsummeringList;
