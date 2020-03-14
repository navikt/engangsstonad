import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field, useFormikContext } from 'formik';
import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { intlPrefix, getErrorMessage } from '../utils';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';
import { visibilityHook } from '../hooks/hooks';

const Checkbox: React.StatelessComponent<FormComponentProps> = ({ name, parent ="NO_PARENT" }) => {
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
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
                        feil={getErrorMessage(form, name)}
                    />
                );
            }}
        />
    );
};
export default withGradualVisibility(Checkbox);
