import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field, useFormikContext } from 'formik';
import { Select as NavSelect, SelectProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import { getErrorMessage, intlPrefix } from '../utils';
import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { FormProps } from 'app/engangsstonad/FormProps';
import { visibilityHook } from '../hooks/hooks';

interface Props extends FormComponentProps, Omit<SelectProps, 'name' | 'children'> {
    options: Array<{
        value: string | number;
        label: string;
    }>;
}

const Select: React.FunctionComponent<Props> = ({ name, parent = "NO_PARENT", options }) => {
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                return (
                    <NavSelect
                        bredde="fullbredde"
                        label={<FormattedMessage id={intlPrefix(name)} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                            form.setFieldTouched(field.name, true, false);
                        }}
                        value={field.value}
                        feil={getErrorMessage(form, name)}
                    >
                        <option key={guid()} value={''} />
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
export default withGradualVisibility<Props>(Select);
