import * as Yup from 'yup';
import { Question } from './questions';
import * as moment from 'moment';

const Steg1ValidationSchema = () =>
    Yup.object().shape({
        [Question.erFødt]: Yup.boolean().required('Required'),
        [Question.antallBarn]: Yup.number().required('Required'),
        [Question.fødselsdato]: Yup.string().when(Question.erFødt, {
            is: true,
            then: Yup.string()
                .required('Required')
                .test(Question.fødselsdato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, [moment.HTML5_FMT.DATE], true).isValid();
                })
                .test(Question.fødselsdato, 'Kan ikke være frem i tid', (value) => {
                    return moment(value, [moment.HTML5_FMT.DATE], true).isSameOrBefore(moment());
                })
        }),
        [Question.termindato]: Yup.string().when(Question.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Question.termindato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, [moment.HTML5_FMT.DATE], true).isValid();
                })
        }),
        [Question.terminberkreftelse]: Yup.array().when(Question.erFødt, {
            is: false,
            then: Yup.array()
        }),
        [Question.terminberkreftelseDato]: Yup.string().when(Question.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Question.terminberkreftelseDato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, [moment.HTML5_FMT.DATE], true).isValid();
                })
        })
    });

export default Steg1ValidationSchema;
