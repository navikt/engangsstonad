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
                .test(Questions.fødselsdato, 'valideringsfeil.ugyldigDato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Questions.fødselsdato, 'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isSameOrBefore(moment());
                })
                .test(Questions.fødselsdato, 'valideringsfeil.fodselsdato.ikkeMerEnn3ÅrTilbake"', (value) => {
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
                .test(Questions.termindato, 'valideringsfeil.ugyldigDato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(Questions.termindato, 'valideringsfeil.termindato.duMåVæreIUke22', (value) => {
                    return erIUke22Pluss3(value);
                })
                .test(Questions.termindato, 'valideringsfeil.termindato.termindatoKanIkkeVære3UkerFraIdag', (value) => {
                    return erMindreEnn3UkerSiden(value);
                })
        }),
        [Questions.terminberkreftelse]: Yup.array().when(Questions.erFødt, {
            is: false,
            then: Yup.array().min(1, 'relasjonBarn.vedlegg.feilmelding.vedleggMangler')
        }),
        [Questions.terminbekreftelseDato]: Yup.string().when(Questions.erFødt, {
            is: false,
            then: Yup.string()
                .required('Required')
                .test(Questions.terminbekreftelseDato, 'valideringsfeil.ugyldigDato', (value) => {
                    return moment(value, moment.HTML5_FMT.DATE, true).isValid();
                })
                .test(
                    Questions.terminbekreftelseDato,
                    'valideringsfeil.terminbekreftelseDato.måVæreIdagEllerTidligere',
                    (value) => {
                        return idagEllerTidligere(value);
                    }
                )
                .test(
                    Questions.terminbekreftelseDato,
                    'valideringsfeil.terminbekreftelseDato.duMåVæreIUke22',
                    (value) => {
                        return utstedtDatoErIUke22(value, (Yup.ref(Questions.termindato) as unknown) as string);
                    }
                )
        })
    });

export default Steg1ValidationSchema;
