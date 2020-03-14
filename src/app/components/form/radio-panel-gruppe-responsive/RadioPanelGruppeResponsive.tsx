import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field, useFormikContext } from 'formik';
import { RadioPanelGruppeResponsive } from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

import { parseNavFrontend, getCheckedRadioValue } from './utils/utils';
import { intlPrefix, getErrorMessage } from '../utils';
import { FormComponentProps, withGradualVisibility as withGradualVisibility } from '../visibility-hoc/withVisibility';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';
import { visibilityHook } from '../hooks/hooks';

export type RadioValues = string | boolean | number;

interface Props extends FormComponentProps {
    radioValues: RadioValues[];
    twoColumns?: boolean;
}

const RadioPanelGruppeResponsiveWrapper: React.FunctionComponent<Props> = ({
    name,
    parent = "NO_PARENT",
    radioValues,
    twoColumns,
    ...rest
}) => {
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                return (
                    <RadioPanelGruppeResponsive
                        name={field.name}
                        legend={<FormattedMessage id={intlPrefix(name)} />}
                        radios={radioValues.map((radioValue) => ({
                            label: <FormattedMessage id={intlPrefix(`${field.name}.${radioValue}`)} />,
                            value: radioValue.toString()
                        }))}
                        onChange={(_, value: string) => {
                            form.setFieldValue(field.name, parseNavFrontend(value));
                            form.setFieldTouched(field.name, true, false);
                        }}
                        checked={getCheckedRadioValue(field.value)}
                        twoColumns={twoColumns}
                        feil={getErrorMessage(form, name)}
                        {...rest}
                    />
                );
            }}
        />
    );
};
export default withGradualVisibility<Props>(RadioPanelGruppeResponsiveWrapper);
