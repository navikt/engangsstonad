import * as Yup from 'yup';
import { Questions } from './questions';

const Steg3ValidationSchema = () =>
    Yup.object().shape({
        [Questions.harVærtIUtlandSiste12Mnd]: Yup.boolean().required('Required'),
        [Questions.oppholdSiste12Mnd]: Yup.array().when(Questions.harVærtIUtlandSiste12Mnd, {
            is: true,
            then: Yup.array()
                .min(1)
                .required('Required')
        }),
        [Questions.skalVæreIUtlandNeste12Mnd]: Yup.boolean().required('Required'),
        [Questions.oppholdNeste12Mnd]: Yup.array().when(Questions.skalVæreIUtlandNeste12Mnd, {
            is: true,
            then: Yup.array()
                .min(1)
                .required('Required')
        })
    });

export default Steg3ValidationSchema;
