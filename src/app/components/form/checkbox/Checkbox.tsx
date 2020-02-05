import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import { intlPrefix } from '../utils';

interface Props {
    name: string;
}

const Checkbox: React.StatelessComponent<Props> = ({ name }) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                return (
                    <NavCheckbox
                        label={<FormattedMessage id={intlPrefix(name)} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                            form.setFieldTouched(field.name, true, false);
                        }}
                        checked={field.value || false}
                    />
                );
            }}
        />
    );
};
export default Checkbox;
