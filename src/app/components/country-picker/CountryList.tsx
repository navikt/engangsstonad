import * as React from 'react';
import CountryListElement from './CountryListElement';
import { Periode } from '../../types/domain/Utenlandsopphold';

import './countryPicker.less';

interface CountryListProps {
    utenlandsoppholdListe: Periode[];
}

export const CountrySummaryList: React.StatelessComponent<CountryListProps> = props => (
    <ul className="countryList">
        {props.utenlandsoppholdListe.map((periode: Periode, index: number) => <CountryListElement key={index} utenlandsopphold={periode} />)}
    </ul>
);

interface EditableCountryListProps extends CountryListProps {
    onEditClick: (periode: Periode) => void;
    onDeleteClick: (periode: Periode) => void;
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
