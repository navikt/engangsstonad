import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'SET_FØDSELSDATO' = 'setFødselsdato',
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_ER_BARNET_FODT' = 'setErBarnetFødt',
    'SET_TERMINDATO' = 'setTermindato',
    'SET_TERMINBEKREFTELSE_DATO' = 'setTerminbekreftelseDato',

    // Medlemsskap
    'ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE' = 'addTidligereUtenlandsoppholdPeriode',
    'EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE' = 'editTidligereUtenlandsoppholdPeriode',
    'DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE' = 'deleteTidligereUtenlandsoppholdPeriode',
    'ADD_SENERE_UTENLANDSOPPHOLD_PERIODE' = 'addSenereUtenlandsoppholdPeriode',
    'EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE' = 'editSenereUtenlandsoppholdPeriode',
    'DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE' = 'deleteSenereUtenlandsoppholdPeriode',
    'SET_JOBBET_I_NORGE_SISTE_12_MND' = 'setJobbetINorgeSiste12Mnd',
    'SET_I_NORGE_SISTE_12_MND' = 'setINorgeSiste12Mnd',
    'SET_I_NORGE_NESTE_12_MND' = 'setINorgeNeste12Mnd',
    'SET_FODSEL_I_NORGE' = 'setFødselINorge',

    // AnnenForelder
    'SET_ANNEN_FORELDER_NAVN' = 'setAnnenForelderNavn',
    'SET_ANNEN_FORELDER_FNR' = 'setAnnenForelderFnr',
    'SET_ANNEN_FORELDER_UTENLANDSK_FNR' = 'setAnnenForelderUtenlandskFnr',
    'SET_ANNEN_FORELDER_BOSTEDSLAND' = 'setAnnenForelderBostedsland',
    'SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS' = 'setAnnenForelderKanIkkeOppgis',

    // Annet
    'RESET_SØKNAD' = 'resetSøknad',

    // attachments
    'UPLOAD_ATTACHMENT' = 'uploadAttachment',
    'UPLOAD_ATTACHMENT_SUCCESS' = 'uploadAttachmentSuccess',
    'UPLOAD_ATTACHMENT_FAILED' = 'uploadAttachmentFailed',
    'DELETE_ATTACHMENT' = 'deleteAttachment'
}

// Barn
interface SetFødselsdato {
    type: SoknadActionKeys.SET_FØDSELSDATO;
    fødselsdato: string;
}

// RelasjonTilBarn
interface SetAntallBarn {
    type: SoknadActionKeys.SET_ANTALL_BARN;
    antallBarn: number;
}

interface SetErBarnetFødt {
    type: SoknadActionKeys.SET_ER_BARNET_FODT;
    erBarnetFødt?: boolean;
}

interface SetTermindato {
    type: SoknadActionKeys.SET_TERMINDATO;
    termindato: string;
}

interface SetTerminbekreftelseDato {
    type: SoknadActionKeys.SET_TERMINBEKREFTELSE_DATO;
    terminbekreftelseDato: string;
}

// Medlemsskap
interface AddTidligereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
}

interface EditTidligereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
    index: number;
}

interface DeleteTidligereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
}

interface AddSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
}

interface EditSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
    index: number;
}

interface DeleteSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Utenlandsopphold;
}

interface SetJobbetINorgeSiste12Mnd {
    type: SoknadActionKeys.SET_JOBBET_I_NORGE_SISTE_12_MND;
    jobbetINorgeSiste12Mnd: boolean;
}

interface SetFødselINorge {
    type: SoknadActionKeys.SET_FODSEL_I_NORGE;
    fødselINorge: boolean;
}

interface SetINorgeSiste12Mnd {
    type: SoknadActionKeys.SET_I_NORGE_SISTE_12_MND;
    iNorgeSiste12Mnd: boolean;
}

interface SetINorgeNeste12Mnd {
    type: SoknadActionKeys.SET_I_NORGE_NESTE_12_MND;
    iNorgeNeste12Mnd: boolean;
}

// AnnenForelder
interface SetAnnenForelderNavn {
    type: SoknadActionKeys.SET_ANNEN_FORELDER_NAVN;
    navn: string;
}

interface SetAnnenForelderFnr {
    type: SoknadActionKeys.SET_ANNEN_FORELDER_FNR;
    fnr: string;
}

interface SetAnnenForelderUtenlandskFnr {
    type: SoknadActionKeys.SET_ANNEN_FORELDER_UTENLANDSK_FNR;
    utenlandskFnr: boolean;
}

interface SetAnnenForelderBostedsland {
    type: SoknadActionKeys.SET_ANNEN_FORELDER_BOSTEDSLAND;
    bostedsland: string;
}

interface SetAnnenForelderKanIkkeOppgis {
    type: SoknadActionKeys.SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS;
    kanIkkeOppgis: boolean;
}

interface ResetSøknad {
    type: SoknadActionKeys.RESET_SØKNAD;
}

export interface UploadAttachment {
    type: SoknadActionKeys.UPLOAD_ATTACHMENT;
    payload: Attachment;
}

export interface UploadAttachmentSuccess {
    type: SoknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS;
    attachment: Attachment;
    url: string;
    uuid: string;
}

export interface UploadAttachmentFailed {
    type: SoknadActionKeys.UPLOAD_ATTACHMENT_FAILED;
    attachment: Attachment;
    error: string;
}

export interface DeleteAttachment {
    type: SoknadActionKeys.DELETE_ATTACHMENT;
    attachment: Attachment;
}

export type SoknadActionTypes =
    | SetFødselsdato
    | AddTidligereUtenlandsoppholdPeriode
    | EditTidligereUtenlandsoppholdPeriode
    | DeleteTidligereUtenlandsoppholdPeriode
    | AddSenereUtenlandsoppholdPeriode
    | EditSenereUtenlandsoppholdPeriode
    | DeleteSenereUtenlandsoppholdPeriode
    | SetAntallBarn
    | SetErBarnetFødt
    | SetFødselINorge
    | SetTermindato
    | SetTerminbekreftelseDato
    | SetJobbetINorgeSiste12Mnd
    | SetINorgeSiste12Mnd
    | SetINorgeNeste12Mnd
    | SetAnnenForelderNavn
    | SetAnnenForelderFnr
    | SetAnnenForelderUtenlandskFnr
    | SetAnnenForelderBostedsland
    | SetAnnenForelderKanIkkeOppgis
    | ResetSøknad
    | UploadAttachment
    | UploadAttachmentSuccess
    | UploadAttachmentFailed
    | DeleteAttachment
