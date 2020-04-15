import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormikProps } from 'formik';

import { FormProps } from 'app/engangsstonad/FormProps';

export const intlPrefix = (value: string) => {
    return `spørsmål.${value}`;
};

export const getPlaceholder = (value: string): string => {
    return intlPrefix(value).concat('.placeholder');
};

export const getErrorMessage = (form: FormikProps<Partial<FormProps>>, name: string) => {
    return form.status?.hasSubmitted && form.errors[name] ? (
        <FormattedMessage id={form.errors[name]?.toString()} />
    ) : (
        undefined
    );
};