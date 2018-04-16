export interface ValidatorProps {
    name?: string;
    validators?: any[];
}

export interface InputProps {
    feil?: Feil;
    label?: string | React.ReactNode;
}

export interface Validator {
    test: () => boolean;
    failText: string;
}

export interface Feil {
    tittel?: string;
    feilmelding: string;
}

export type ValidComponentProps = ValidatorProps & InputProps;
