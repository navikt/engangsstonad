import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps } from 'formik';
import { parseNavFrontend, getCheckedRadioValue } from './util';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';


export type RadioValues = string | boolean | number;

interface Props {
    fieldProps: FieldProps;
    radioValues: RadioValues[];
}

const RadioPanelGruppeResponsiveWrapper: React.StatelessComponent<Props> = ({ fieldProps, radioValues }) => {
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
                    field.onChange(e);
                    form.setFieldValue(field.name, parseNavFrontend(value));
                    form.setFieldTouched(field.name, true);
                }}
                checked={getCheckedRadioValue(field.value)}
            />
    );
};
export default RadioPanelGruppeResponsiveWrapper;
