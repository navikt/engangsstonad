import * as Yup from 'yup';
import { Questions } from './questions';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_NAVN_LENGTH = 100;
const MAKS_FNR_LENGTH = 30;

const Steg2ValidationSchema = () =>
    Yup.object().shape({
        [Questions.kanIkkeOppgis]: Yup.mixed(),
        [Questions.navn]: Yup.string().when(Questions.kanIkkeOppgis, {
            is: (kanIkkeOppgis) => kanIkkeOppgis === false || kanIkkeOppgis === undefined,
            then: Yup.string()
                .required('Required')
                .max(MAKS_NAVN_LENGTH, 'Kan ikke være mer enn 30 karakterer')
        }),
        [Questions.fodselsnummer]: Yup.string().when([Questions.kanIkkeOppgis, Questions.navn], {
            is: (kanIkkeOppgis) => kanIkkeOppgis === false || kanIkkeOppgis === undefined,
            then: Yup.string()
                .required('Required')
                .max(MAKS_FNR_LENGTH)
                .test(Questions.fodselsnummer, 'Må være et gyldig fødselsnummer', (value) => {
                    if ((Yup.ref(Questions.utenlandskFodselsnummer) as unknown) as boolean === true) {
                        return true;
                    }
                    try {
                        return isValidFødselsnummer(value);
                    } catch (error) {
                        return false;
                    }
                })
        }),
        [Questions.bostedsland]: Yup.string().when([Questions.kanIkkeOppgis, Questions.utenlandskFodselsnummer], {
            is: (kanIkkeOppgis, utenlanskFødselsnummer) =>
                (kanIkkeOppgis === undefined || kanIkkeOppgis === false) && utenlanskFødselsnummer,
            then: Yup.string().required('Required')
        })
    });

export default Steg2ValidationSchema;
