import * as React from 'react';
import CountryListElement from './CountryListElement';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';

import './countryPicker.less';

interface CountryListProps {
    utenlandsoppholdListe: Utenlandsopphold[];
}

export const CountrySummaryList: React.StatelessComponent<CountryListProps> = props => (
    <ul className="countryList countryList--summary">
        {props.utenlandsoppholdListe.map((periode: Utenlandsopphold, index: number) => (
            <CountryListElement key={index} utenlandsopphold={periode} />
        ))}
    </ul>
);

interface EditableCountryListProps extends CountryListProps {
    onEditClick: (periode: Utenlandsopphold) => void;
    onDeleteClick: (periode: Utenlandsopphold) => void;
}

export const CountryList: React.StatelessComponent<EditableCountryListProps> = props =>
    props.utenlandsoppholdListe.length === 0 ? null : (
        <ul className="countryList">
            {props.utenlandsoppholdListe.map((utenlandsopphold, index) => (
                <CountryListElement
                    key={index}
                    utenlandsopphold={utenlandsopphold}
                    onEditClick={() => props.onEditClick(utenlandsopphold)}
                    onDeleteClick={() => props.onDeleteClick(utenlandsopphold)}
                />
            ))}
        </ul>
    );
