import * as Yup from 'yup';
import { Questions } from './questions';
import * as moment from 'moment';
import {
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    idagEllerTidligere,
    utstedtDatoErIUke22
} from '../../../util/validation/validationUtils';

const Steg1ValidationSchema = () =>
    Yup.object().shape({
        [Questions.erFødt]: Yup.boolean().required('Required'),
        [Questions.antallBarn]: Yup.number().required('Required'),
        [Questions.fødselsdato]: Yup.string().when(Questions.erFødt, {
            is: true,
            then: Yup.string()
                .required('Required')
                .test(Questions.fødselsdato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Questions.fødselsdato, 'Kan ikke være frem i tid', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isSameOrBefore(moment());
                })
                .test(Questions.fødselsdato, 'Kan ikke være mer enn 3 år tilbake i tid', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isSameOrAfter(
                        moment().subtract(3, 'years'),
                        'days'
                    );
                })
        }),
        [Questions.termindato]: Yup.string().when(Questions.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Questions.termindato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Questions.termindato, 'Du må være i uke 22', (value) => {
                    return erIUke22Pluss3(value);
                })
                .test(Questions.termindato, 'Termindato kan ikke være 3 uker fra i dag', (value) => {
                    return erMindreEnn3UkerSiden(value);
                })
        }),
        [Questions.terminberkreftelse]: Yup.array().when(Questions.erFødt, {
            is: false,
            then: Yup.array().min(1, 'Terminbekreftelse er påkrevd')
        }),
        [Questions.terminberkreftelseDato]: Yup.string().when(Questions.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Questions.terminberkreftelseDato, 'Ikke en gyldig dato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Questions.terminberkreftelseDato, 'Dato må være i dag eller tidligere', (value) => {
                    return idagEllerTidligere(value);
                })
                .test(Questions.terminberkreftelseDato, 'Du må være i uke 22', (value) => {
                    return utstedtDatoErIUke22(value, (Yup.ref(Questions.termindato) as unknown) as string);
                })
        })
    });

export default Steg1ValidationSchema;
