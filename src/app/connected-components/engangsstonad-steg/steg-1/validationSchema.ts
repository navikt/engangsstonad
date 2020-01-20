import * as Yup from 'yup';
import { Question } from './questions';
import * as moment from 'moment';
import {
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    idagEllerTidligere,
    utstedtDatoErIUke22
} from '../../../util/validation/validationUtils';

const Steg1ValidationSchema = () =>
    Yup.object().shape({
        [Question.erFødt]: Yup.boolean().required('Required'),
        [Question.antallBarn]: Yup.number().required('Required'),
        [Question.fødselsdato]: Yup.string().when(Question.erFødt, {
            is: true,
            then: Yup.string()
                .required('Required')
                .test(Question.fødselsdato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Question.fødselsdato, 'Kan ikke være frem i tid', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isSameOrBefore(moment());
                })
                .test(Question.fødselsdato, 'Kan ikke være mer enn 3 år tilbake i tid', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isSameOrAfter(
                        moment().subtract(3, 'years'),
                        'days'
                    );
                })
        }),
        [Question.termindato]: Yup.string().when(Question.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Question.termindato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Question.termindato, 'Du må være i uke 22', (value) => {
                    return erIUke22Pluss3(value);
                })
                .test(Question.termindato, 'Termindato kan ikke være 3 uker fra i dag', (value) => {
                    return erMindreEnn3UkerSiden(value);
                })
        }),
        [Question.terminberkreftelse]: Yup.array().when(Question.erFødt, {
            is: false,
            then: Yup.array().min(1, 'Terminbekreftelse er påkrevd')
        }),
        [Question.terminberkreftelseDato]: Yup.string().when(Question.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Question.terminberkreftelseDato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Question.terminberkreftelseDato, 'Dato må være i dag eller tidligere', (value) => {
                    return idagEllerTidligere(value);
                })
                .test(Question.terminberkreftelseDato, 'Du må være i uke 22', (value) => {
                    return utstedtDatoErIUke22(value, (Yup.ref(Question.termindato) as unknown) as string);
                })
        })
    });

export default Steg1ValidationSchema;
