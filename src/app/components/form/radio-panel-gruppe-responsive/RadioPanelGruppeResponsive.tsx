import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { RadioPanelGruppeResponsive } from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { parseNavFrontend, getCheckedRadioValue } from './utils/utils';

export type RadioValues = string | boolean | number;

interface Props {
    name: string;
    radioValues: RadioValues[];
    twoColumns?: boolean;

}

const RadioPanelGruppeResponsiveWrapper: React.StatelessComponent<Props> = ({ name, radioValues, twoColumns, ...rest }) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => (
                <RadioPanelGruppeResponsive
                    name={field.name}
                    legend={<FormattedMessage id={`spørsmål.${name}`} />}
                    radios={radioValues.map((radioValue) => ({
                        label: <FormattedMessage id={`spørsmål.${field.name}.${radioValue}`} />,
                        value: radioValue.toString()
                    }))}
                    onChange={(e, value: string) => {
                        form.setFieldValue(field.name, parseNavFrontend(value));
                        form.setFieldTouched(field.name, true, false);
                    }}
                    checked={getCheckedRadioValue(field.value)}
                    twoColumns={twoColumns}
                    {...rest}
                />
            )}
        />
    );
};
export default RadioPanelGruppeResponsiveWrapper;
