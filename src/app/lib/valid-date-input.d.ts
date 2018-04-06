import { Props as DatovelgerProps } from 'datovelger';

interface ValidatorProps {
    name: string;
    validators: any[];
}
interface InputProps {
    feil?: Feil;
    label: string | React.ReactNode;
}

export type ValidateInputProps = InputProps & ValidatorProps & DatovelgerProps;

const ValidDateInput: new (props: Props) => React.Component<ValidDateInputProps, any>;

export default ValidDateInput;
