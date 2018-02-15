import * as React from 'react';
import CountryListElement from './CountryListElement';
import CountryListSummaryElement from './CountryListSummaryElement';
import './countryPicker.less';
import { Utenlandsopphold } from '../../../types/domain/Medlemsskap';

interface CountryListElementProps {
    utenlandsoppholdListe: Utenlandsopphold[];
    onEditClick: (utl: Utenlandsopphold) => void;
    onDeleteClick: (utl: Utenlandsopphold) => void;
}

const renderCountryListElement = (props: CountryListElementProps) =>
    props.utenlandsoppholdListe.map((utenlandsopphold, index) => (
        <CountryListElement
            key={index}
            utenlandsopphold={utenlandsopphold}
            onEditClick={() => props.onEditClick(utenlandsopphold)}
            onDeleteClick={() => props.onDeleteClick(utenlandsopphold)}
        />
    ));

interface CountryListSummaryElementProps {
    utenlandsoppholdListe: Utenlandsopphold[];
}

const renderCountryListSummaryElement = (props: CountryListSummaryElementProps ) =>
    props.utenlandsoppholdListe.map((visit: Utenlandsopphold, index: number) => (
        <CountryListSummaryElement
            key={index}
            utenlandsopphold={visit}
        />
    ));

interface CountryListProps {
    type?: string;
    utenlandsoppholdListe: Utenlandsopphold[];
    onDeleteClick: (utl: Utenlandsopphold) => void;
    onEditClick: (utl: Utenlandsopphold) => void;
}

const CountryList: React.StatelessComponent<CountryListProps> = (props) => {
    if (props.type === 'oppsummering') {
        return <div>{props.utenlandsoppholdListe && renderCountryListSummaryElement(props)}</div>;
    }
    return <div>{props.utenlandsoppholdListe && renderCountryListElement(props)}</div>;
};
export default CountryList;
