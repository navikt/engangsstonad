import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps } from 'formik';

import { Select as NavSelect } from 'nav-frontend-skjema';

interface Props {
    fieldProps: FieldProps;
    options: Array<string | number>;
}

const Select: React.StatelessComponent<Props> = ({ fieldProps, options }) => {
    const { field, form } = fieldProps;
    return (
        <NavSelect
            bredde="xs"
            label={<FormattedMessage id={field.name} />}
            onChange={(e) => {
                form.setFieldValue(field.name, e.target.value);
                form.setFieldTouched(field.name, true)
            }}
            value={fieldProps.field.value}>
            {options.map((option) => {
                return (<option value={option}>
                    {String(option)}
                </option>);
            })}
        </NavSelect>
    );
};
export default Select;
