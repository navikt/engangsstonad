import { Props as DatovelgerProps } from 'nav-datovelger';
import { ValidComponentProps } from './types';

export type ValidateInputProps = ValidComponentProps & DatovelgerProps;

const ValidDateInput: new (props: Props) => React.Component<
    ValidDateInputProps,
    any
>;

export default ValidDateInput;
