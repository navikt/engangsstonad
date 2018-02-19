import * as React from 'react';
import { default as RadioList, RadioListChangeEvent, RadioListProps } from 'shared/radio-list/RadioList';
import getMessage from 'util/i18n/i18nUtils';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface OptionProps {
    labelIntlId: string;
    value: string;
}

interface RadioListConfig {
    name: string;
    titleIntlId: string;
    selectedValue?: string;
    options: OptionProps[];
    action: RadioListChangeEvent;
}

const renderRadioList = (config: RadioListConfig & InjectedIntlProps) => {
    const { intl, titleIntlId, action, options, ...other } = config;
    const title = getMessage(intl, titleIntlId);
    const radioListProps: RadioListProps = {
        title,
        options: options.map((option) => ({ value: option.value, label: getMessage(intl, option.labelIntlId) })),
        onChange: action,
        ...other
    };
    return <RadioList {...radioListProps} />;
};

export default renderRadioList;
