import * as Yup from 'yup';
import { Questions } from './questions';
import { Tidsperiode } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import * as moment from 'moment';

const erInnenforTidsperiode = (dato: string, validDateRange?: Tidsperiode) => {
    return validDateRange === undefined
        ? true
        : moment(dato).isBetween(validDateRange.fom, validDateRange.tom, 'days', '[]');
};

const CountryPickerValidationSchema = (validDateRange?: Tidsperiode, invalidDateRanges: Tidsperiode[] = []) =>
    Yup.object().shape({
        [Questions.land]: Yup.string().required('Required'),
        [Questions.fom]: Yup.date()
            .required('Required')
            .test(Questions.fom, 'Ikke en gyldig dato', (value) => {
                return moment(value, moment.HTML5_FMT.DATE, true).isValid();
            })
            .test(Questions.fom, 'Må være innenfor gyldig tidsperiode', (value) =>
                erInnenforTidsperiode(value, validDateRange)
            )
            .test(Questions.fom, 'Kan ikke overlappe ekisterende periode', (value) => {
                return !invalidDateRanges.some((dateRange) => erInnenforTidsperiode(value, dateRange));
            })
            .max(Yup.ref(Questions.tom), 'Kan ikke starte etter tom dato'),
        [Questions.tom]: Yup.date()
            .required('Required')
            .test(Questions.tom, 'Ikke en gyldig dato', (value) => {
                return moment(value, moment.HTML5_FMT.DATE, true).isValid();
            })
            .test(Questions.tom, 'Må være innenfor gyldig tidsperiode', (value) =>
                erInnenforTidsperiode(value, validDateRange)
            )
            .test(Questions.fom, 'Kan ikke overlappe ekisterende periode', (value) => {
                return !invalidDateRanges.some((dateRange) => erInnenforTidsperiode(value, dateRange));
            })
            .min(Yup.ref(Questions.fom), 'tom dato kan ikke være før fom dato')
    });

export default CountryPickerValidationSchema;
