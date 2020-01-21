import * as Yup from 'yup';
import { Questions } from './questions';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_NAVN_LENGTH = 100;
const MAKS_FNR_LENGTH = 30;

const Steg2ValidationSchema = () =>
    Yup.object().shape({
        [Questions.navn]: Yup.string().when(Questions.kanIkkeOppgis, {
            is: (value) => value === false || value === undefined,
            then: Yup.string()
                .required('Required')
                .max(MAKS_NAVN_LENGTH, 'Kan ikke være mer enn 30 karakterer')
        }),
        [Questions.fodselsnummer]: Yup.string().when([Questions.kanIkkeOppgis, Questions.navn], {
            is: (kanIkkeOppgis, navn) => navn && (kanIkkeOppgis === false || kanIkkeOppgis === undefined),
            then: Yup.string()
                .required('Required')
                .max(MAKS_FNR_LENGTH)
                .test(Questions.fodselsnummer, 'Må være et gyldig fødselsnummer', (value) => {
                    try {
                        return isValidFødselsnummer(value);
                    } catch (error) {
                        return false;
                    }
                })
        }),
        [Questions.bostedsland]: Yup.string().when([Questions.kanIkkeOppgis, Questions.utenlandskFodselsnummer], {
            is: (kanIkkeOppgis, utenlanskFødselsnummer) => kanIkkeOppgis === false && utenlanskFødselsnummer,
            then: Yup.string().required('Required')
        })
    });

export default Steg2ValidationSchema;
