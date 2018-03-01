import * as React from 'react';
import CountryListElement from './CountryListElement';
import CountryListSummaryElement from './CountryListSummaryElement';
import './countryPicker.less';
import { Periode } from '../../../types/domain/Utenlandsopphold';

interface CountryListProps {
    utenlandsoppholdListe: Periode[];
}

export const CountrySummaryList: React.StatelessComponent<CountryListProps> = (props) => (
    <ul>{props.utenlandsoppholdListe.map((periode: Periode, index: number) => (
        <CountryListSummaryElement
            key={index}
            utenlandsopphold={periode}
        />
    ))}
    </ul>
);

interface EditableCountryListProps extends CountryListProps {
    onEditClick: (periode: Periode) => void;
    onDeleteClick: (periode: Periode) => void;
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
        ))}
    </ul>
);
