import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { parseNavFrontend, getCheckedRadioValue } from './util';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

export type RadioValues = string | boolean | number;

interface Props {
    name: string;
    radioValues: RadioValues[];
}

const RadioPanelGruppeResponsiveWrapper: React.StatelessComponent<Props> = ({ name, radioValues }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <RadioPanelGruppeResponsive
                        name={field.name}
                        legend={<FormattedMessage id={field.name} />}
                        radios={radioValues.map((radioValue) => ({
                            label: <FormattedMessage id={`${field.name}.${radioValue}`} />,
                            value: radioValue.toString(),
                            inputProps: {
                                id: `js-${field.name}-${radioValue}`
                            }
                        }))}
                        onChange={(e, value: string) => {
                            form.setFieldValue(field.name, parseNavFrontend(value));
                            form.setFieldTouched(field.name, true, false);
                        }}
                        checked={getCheckedRadioValue(field.value)}
                    />
                );
            }}
        />
    );
};
export default RadioPanelGruppeResponsiveWrapper;
