import * as React from 'react';
import * as countries from 'i18n-iso-countries';
const bokmalCountryList = require('i18n-iso-countries/langs/nb.json');
const nynorskCountryList = require('i18n-iso-countries/langs/nn.json');
const { Select } = require('nav-frontend-skjema');

interface StateProps {
    defaultValue?: string;
    language: string;
    label: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class CountrySelect extends React.Component<StateProps> {
    componentWillMount() {
        const countriesLanguage = this.props.language === 'nb' ? bokmalCountryList : nynorskCountryList;
        countries.registerLocale(countriesLanguage);
    }

    renderCountryOptions() {
        const { language } = this.props;
        return Object.entries(countries.getNames(language))
            .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], language))
            .map((optionValue: string[]) => (
                <option key={optionValue[0]} value={optionValue[0]}>
                    {optionValue[1]}
                </option>
            ));
    }

    render() {
        return (
            <Select {...this.props}>
                <option value="" />
                {this.renderCountryOptions()}
            </Select>
        );
    }
}
