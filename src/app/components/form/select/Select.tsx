import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Select as NavSelect, SelectProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import { getErrorMessage, intlPrefix } from '../utils';
import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { VisibilityContext } from '../visibility-context/VisibilityContext';
import { visibilityHook } from '../hooks/hooks';

interface Props extends FormComponentProps, Omit<SelectProps, 'name' | 'children'> {
    options: Array<{
        value: string | number;
        label: string;
    }>;
}

const Select: React.FunctionComponent<Props> = ({ name, options }) => {
    const visibilityContext = React.useContext(VisibilityContext);
    visibilityHook(visibilityContext.updateVisibility, name);
    return (
        <Field name={name}>
            {({ form, field }: FieldProps) => (
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
            )}
        </Field>
    );
};
export default withGradualVisibility<Props>(Select);
