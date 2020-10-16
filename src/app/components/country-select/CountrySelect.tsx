import React from 'react';
import * as countries from 'i18n-iso-countries';
import { Feil } from 'components/skjema-input-element/types';
import { Språkkode } from 'intl/types';
const { ValidSelect } = require('./../../lib') as any;
const { Select } = require('nav-frontend-skjema');

interface Props {
    defaultValue?: string;
    språkkode: Språkkode;
    label: React.ReactNode;
    feil?: Feil;
    validators?: any;
    name?: string;
    onChange: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelect: React.FunctionComponent<Props> = ({ språkkode, validators, onChange, ...restProps }) => {
    const renderCountryOptions = () => {
        const isoCodeIndex = 0;
        const countryNameIndex = 1;
        return Object.entries(countries.getNames(språkkode))
            .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], språkkode))
            .filter((countryOptionValue) => countryOptionValue[isoCodeIndex] !== 'NO')
            .map((countryOptionValue: string[]) => (
                <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                    {countryOptionValue[countryNameIndex]}
                </option>
            ));
    };

    const SelectComponent = validators && validators.length > 0 ? ValidSelect : Select;

    return (
        <SelectComponent
            {...restProps}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value, e)}
            validators={validators}
        >
            <option value="" />
            {renderCountryOptions()}
        </SelectComponent>
    );
};

export default CountrySelect;
