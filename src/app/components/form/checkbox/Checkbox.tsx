import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { intlPrefix, getErrorMessage } from '../utils';
import { visibilityHook } from '../hooks/hooks';
import { VisibilityContext } from '../visibility-context/VisibilityContext';

const Checkbox: React.StatelessComponent<FormComponentProps> = ({ name }) => {
    const visibilityContext = React.useContext(VisibilityContext);
    visibilityHook(visibilityContext.updateVisibility, name);
    return (
        <Field name={name}>
            {({ form, field }: FieldProps) => (
                <NavCheckbox
                    label={<FormattedMessage id={intlPrefix(name)} />}
                    onChange={(e) => {
                        form.setFieldValue(field.name, e.target.checked);
                        form.setFieldTouched(field.name, true, false);
                    }}
                    checked={field.value || false}
                    feil={getErrorMessage(form, name)}
                />
            )}
        </Field>
    );
};
export default withGradualVisibility(Checkbox);
