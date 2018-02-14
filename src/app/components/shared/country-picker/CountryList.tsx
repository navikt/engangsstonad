import * as React from 'react';
import CountryListElement from './CountryListElement';
import CountryListSummaryElement from './CountryListSummaryElement';
import { utlandsopphold } from './types';
import './countryPicker.less';

interface CountryListElementProps {
    visits: utlandsopphold[];
    onEditClick: (utl: utlandsopphold) => void;
    onDeleteClick: (utl: utlandsopphold) => void;
}

const renderCountryListElement = (props: CountryListElementProps) =>
    props.visits.map((visit, index) => (
        <CountryListElement
            key={index}
            visit={visit}
            onEditClick={() => props.onEditClick(visit)}
            onDeleteClick={() => props.onDeleteClick(visit)}
        />
    ));

interface CountryListSummaryElementProps {
    visits: utlandsopphold[];
}

const renderCountryListSummaryElement = (props: CountryListSummaryElementProps ) =>
    props.visits.map((visit: utlandsopphold, index: number) => (
        <CountryListSummaryElement
            key={index}
            visit={visit}
        />
    ));

interface CountryListProps {
    type?: string;
    visits: utlandsopphold[];
    onDeleteClick: (utl: utlandsopphold) => void;
    onEditClick: (utl: utlandsopphold) => void;
}

const CountryList: React.StatelessComponent<CountryListProps> = (props) => {
    if (props.type === 'oppsummering') {
        return <div>{props.visits && renderCountryListSummaryElement(props)}</div>;
    }
    return <div>{props.visits && renderCountryListElement(props)}</div>;
};
export default CountryList;
