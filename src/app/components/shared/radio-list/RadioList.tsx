import * as React from 'react';

const { Radio, SkjemaGruppe } = require('nav-frontend-skjema');

import './radioList.less';

type RadioListValue = string;
export type RadioListChangeEvent = (verdi: RadioListValue) => void;

export interface OptionProps {
    label: string;
    value: string;
}

export interface RadioListProps {
    options: OptionProps[];
    name: string;
    title: string;
    selectedValue?: RadioListValue;
    onChange: RadioListChangeEvent;
    error?: object;
}

interface RadioListRadioProps extends OptionProps {
    /** Navn på inputelementene i listen */
    name: string;
    /** Om radio er valgt */
    checked: boolean;
    /** Kall når en radio velges */
    onChange: () => void;
}

const RadioListRadio: React.StatelessComponent<RadioListRadioProps> = (props: RadioListRadioProps) => (
    <Radio {...props}/>
);

const RadioList: React.StatelessComponent<RadioListProps> = ({
     options,
     selectedValue,
     name,
     error,
     title,
     onChange,
}) => {
    return (
        <SkjemaGruppe className="radioList" feil={error} title={title}>
            {options.map((option: OptionProps) => (
                <div className="radioliste__radio" key={`${name}${option.value}`}>
                    <RadioListRadio
                        {...option}
                        name={name}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                    />
                </div>
            ))}
        </SkjemaGruppe>
    );
};

export default RadioList;