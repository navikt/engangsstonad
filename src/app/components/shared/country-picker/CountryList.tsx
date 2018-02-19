import * as React from 'react';
import CountryListElement from './CountryListElement';
import CountryListSummaryElement from './CountryListSummaryElement';
import './countryPicker.less';
import { Utenlandsopphold } from '../../../types/domain/Medlemsskap';

interface CountryListProps {
    utenlandsoppholdListe: Utenlandsopphold[];
}

export const CountrySumnmaryList: React.StatelessComponent<CountryListProps> = (props) => (
    <ul>{props.utenlandsoppholdListe.map((visit: Utenlandsopphold, index: number) => (
        <CountryListSummaryElement
            key={index}
            utenlandsopphold={visit}
        />
    ))};
    </ul>
);

interface EditableCountryListProps extends CountryListProps {
    onEditClick: (utl: Utenlandsopphold) => void;
    onDeleteClick: (utl: Utenlandsopphold) => void;
}

export const CountryList: React.StatelessComponent<EditableCountryListProps> = (props) => (
    <ul>
        {props.utenlandsoppholdListe.map((utenlandsopphold, index) => (
            <CountryListElement
                key={index}
                utenlandsopphold={utenlandsopphold}
                onEditClick={() => props.onEditClick(utenlandsopphold)}
                onDeleteClick={() => props.onDeleteClick(utenlandsopphold)}
            />
        ))};
    </ul>
);
