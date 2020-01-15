import * as Yup from 'yup';
import Steg1ValidationSchema from '../connected-components/engangsstonad-steg/steg-1/validationSchema';

const ValidationSchema = Yup.object().shape({
    ...Steg1ValidationSchema
});
export default ValidationSchema;