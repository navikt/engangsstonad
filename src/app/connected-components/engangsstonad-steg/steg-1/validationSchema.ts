import * as Yup from 'yup';
import { Question } from './questions';

const Steg1ValidationSchema = () =>
    Yup.object().shape({
        [Question.erFødt]: Yup.boolean().required('Required'),
        [Question.antallBarn]: Yup.number().required('Required'),
        [Question.fødselsdato]: Yup.date().when(Question.erFødt, { is: true, then: Yup.date().required('Required') }),
        [Question.termindato]: Yup.date().when(Question.erFødt, { is: false, then: Yup.date().required('Required') }),
        [Question.terminberkreftelse]: Yup.array().when(Question.erFødt, {
            is: false,
            then: Yup.date().required('Required')
        }),
        [Question.terminberkreftelseDato]: Yup.date().when(Question.erFødt, {
            is: false,
            then: Yup.date().required('Required')
        })
    });
export default Steg1ValidationSchema;
