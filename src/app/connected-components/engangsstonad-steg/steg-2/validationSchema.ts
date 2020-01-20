import * as Yup from 'yup';
import { Questions } from './questions';

const Steg2ValidationSchema = () =>
    Yup.object().shape({
        [Questions.kanIkkeOppgis]: Yup.boolean().required('Required'),
        [Questions.navn]: Yup.boolean().required('Required'),
        [Questions.fødselsnummer]: Yup.string().required('Required'),
        [Questions.utenlandskFødselsnummer]: Yup.boolean().required('Required'),
        [Questions.bostedsland]: Yup.boolean().required('Required')
    });

export default Steg2ValidationSchema;
