import React from 'react';
import { FormikProps } from 'formik';
import Input from 'components/form/input/Input';

import { Questions } from './questions';
import { FormProps } from '../FormProps';
import Checkbox from 'components/form/checkbox/Checkbox';
import Select from 'components/form/select/Select';

import * as countries from 'i18n-iso-countries';
import { Language } from 'intl/IntlProvider';

// TODO flytt
const getForignCountries = (language: Language) => {
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

interface Props {
    formikProps: FormikProps<Partial<FormProps>>;
}

const Steg2: React.FunctionComponent<Props> = ({ formikProps }) => {
    return (
        <>
            <Input name={Questions.navn} disabled={formikProps.values[Questions.kanIkkeOppgis]} />
            <Checkbox name={Questions.kanIkkeOppgis} />
            {<Input name={Questions.fødselsnummer} />}
            {<Checkbox name={Questions.utenlandskFødselsnummer} />}
            {formikProps.values[Questions.utenlandskFødselsnummer] && (
                <Select name={Questions.bostedsland} options={getForignCountries(Language.BOKMÅL)} />
            )}
        </>
    );
};
export default Steg2;
