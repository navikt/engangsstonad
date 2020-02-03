import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

interface Props {
    name: string;
}

const Checkbox: React.StatelessComponent<Props> = ({ name }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <NavCheckbox
                        label={<FormattedMessage id={`spørsmål.${name}`} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                            form.setFieldTouched(field.name, true, false);
                        }}
                        checked={field.value}
                    />
                );
            }}
        />
    );
};
export default Checkbox;
