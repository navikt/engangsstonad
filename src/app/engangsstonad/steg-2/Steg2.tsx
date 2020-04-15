import * as React from 'react';
import * as countries from 'i18n-iso-countries';

import getMessage from 'common/util/i18nUtils';
import Input from 'components/form/input/Input';
import Checkbox from 'components/form/checkbox/Checkbox';
import Select from 'components/form/select/Select';
import { getPlaceholder as intlPlaceholderPrefix } from 'components/form/utils';

import { Language } from 'intl/IntlProvider';

import { Questions } from './questions';
import StegProps from '../StegProps';

import './steg2.less';

export const getForignCountries = (language: Language) => {
    const isoCodeIndex = 0;
    const countryNameIndex = 1;
    return Object.entries(countries.getNames(language))
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], language))
        .filter((countryOptionValue) => countryOptionValue[isoCodeIndex] !== 'NO')
        .map((countryOptionValue: string[]) => ({
            label: countryOptionValue[countryNameIndex],
            value: countryOptionValue[isoCodeIndex]
        }));
};

const Steg2: React.FunctionComponent<StegProps> = ({ formikProps, language, intl }) => {
    const { values } = formikProps;
    return (
        <>
            <Input
                name={Questions.navn}
                placeholder={getMessage(intl, intlPlaceholderPrefix(Questions.navn))}
                disabled={values[Questions.kanIkkeOppgis]}
            />
            <Checkbox name={Questions.kanIkkeOppgis} />
            {values[Questions.navn] && !values[Questions.kanIkkeOppgis] && (
                <>
                    <Input
                        name={Questions.fodselsnummer}
                        placeholder={getMessage(intl, intlPlaceholderPrefix(Questions.fodselsnummer))}
                    />
                    <Checkbox name={Questions.utenlandskFodselsnummer} />

                    {values[Questions.utenlandskFodselsnummer] && (
                        <Select
                            name={Questions.bostedsland}
                            parent={Questions.utenlandskFodselsnummer}
                            options={getForignCountries(language)}
                        />
                    )}
                </>
            )}
        </>
    );
};
export default Steg2;
