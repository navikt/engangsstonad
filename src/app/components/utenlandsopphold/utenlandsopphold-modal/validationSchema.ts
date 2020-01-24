import * as Yup from 'yup';
import { Questions } from './questions';

const CountryPickerValidationSchema = () =>
    Yup.object().shape({
        [Questions.land]: Yup.string().required('Required'),
        [Questions.fom]: Yup.string().required('Required'),
        [Questions.tom]: Yup.string().required('Required')
    });

export default CountryPickerValidationSchema;
