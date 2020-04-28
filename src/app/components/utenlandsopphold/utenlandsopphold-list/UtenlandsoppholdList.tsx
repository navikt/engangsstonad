import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { guid } from 'nav-frontend-js-utils';

import { Language } from 'intl/IntlProvider';
import { prettifyTidsperiode } from 'common/util/datoUtils';
import InteractiveListElement from 'components/interactive-list-element/InteractiveListElement';
import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';

import './utenlandsoppholdList.less';

interface CountryListProps {
    language: Language;
    utenlandsoppholdListe: Utenlandsopphold[];
    onEditClick: (periode: Utenlandsopphold) => void;
    onDeleteClick: (periode: Utenlandsopphold) => void;
}

export const CountryList: React.StatelessComponent<CountryListProps> = ({
    onDeleteClick,
    onEditClick,
    utenlandsoppholdListe,
    language,
}) => {
    return (
        <ul className="utenlandsopphold-list">
            {utenlandsoppholdListe.map((utenlandsopphold) => (
                <InteractiveListElement
                    key={guid()}
                    title={countries.getName(utenlandsopphold.land, language)}
                    text={prettifyTidsperiode(utenlandsopphold.tidsperiode)}
                    deleteLinkText={'Slett'}
                    onDelete={() => onDeleteClick(utenlandsopphold)}
                    onEdit={() => onEditClick(utenlandsopphold)}
                />
            ))}
        </ul>
    );
};
