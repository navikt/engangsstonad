import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Feil } from 'components/skjema-input-element/types';
const { ValidSelect } = require('./../../lib') as any;
const { Select } = require('nav-frontend-skjema');

interface StateProps {
    defaultValue?: string;
    language: string;
    label: React.ReactNode;
    feil?: Feil;
    validators?: any;
    name?: string;
    onChange: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class CountrySelect extends React.Component<StateProps> {
    renderCountryOptions() {
        const { language } = this.props;
        const isoCodeIndex = 0;
        const countryNameIndex = 1;
        return Object.entries(countries.getNames(language))
            .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], language))
            .filter((countryOptionValue) => countryOptionValue[isoCodeIndex] !== 'NO')
            .map((countryOptionValue: string[]) => (
                <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                    {countryOptionValue[countryNameIndex]}
                </option>
            ));
    }

    render() {
        const { validators, onChange, ...restProps } = this.props;
        const SelectComponent = validators && validators.length > 0 ? ValidSelect : Select;
        return (
            <SelectComponent
                {...restProps}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value, e)}
                validators={validators}>
                <option value="" />
                {this.renderCountryOptions()}
            </SelectComponent>
        );
    }
}
