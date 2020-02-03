import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    name: string;
    options: Array<{
        value: string | number;
        label: string;
    }>;
}

const Select: React.StatelessComponent<Props> = ({ name, options }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <NavSelect
                        bredde="xs"
                        label={<FormattedMessage id={`spørsmål.${name}`} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                            form.setFieldTouched(field.name, true);
                        }}
                        value={fieldProps.field.value}
                    >
                        {options.map((option) => {
                            return (
                                <option key={guid()} value={option.value}>
                                    {option.label}
                                </option>
                            );
                        })}
                    </NavSelect>
                );
            }}
        />
    );
};
export default Select;
