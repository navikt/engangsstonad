import * as React from 'react';

export interface Range {
    from: Date;
    to: Date;
}

export interface FieldValidator {
    test: () => void;
    failText: string;
}

export interface DateInputProps {
    id: string;
    label: React.ReactNode;
    selectedDate?: string;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    disabled?: boolean;
    fromDate?: Date;
    toDate?: Date;
    errorMessage?: React.ReactNode;
    disabledRanges?: Range[];
    disableWeekends?: boolean;
    fullscreen?: boolean;
    onChange: (date: string) => void;
    validators: FieldValidator[];
}

declare class DateInput extends React.Component<DateInputProps> {}

export default DateInput;
