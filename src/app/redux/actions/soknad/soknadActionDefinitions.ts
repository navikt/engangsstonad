import { Periode } from '../../../types/domain/Utenlandsopphold';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'EDIT_FØDSELSDATO' = 'editFødselsdato',
    'UPDATE_FØDSELSDATOER' = 'updateFødselsdatoer',
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_ER_BARNET_FODT' = 'setErBarnetFødt',
    'SET_TERMINDATO' = 'setTermindato',
    'SET_TERMINBEKREFTELSE_DATO' = 'setTerminbekreftelseDato',
    'ADD_VEDLEGG' = 'addVedlegg',
    'DELETE_VEDLEGG' = 'deleteVedlegg',

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
    'RESET_SØKNAD' = 'resetSøknad'
}

// Barn
interface AddFødselsdato {
    type: SoknadActionKeys.EDIT_FØDSELSDATO;
    fødselsdato: string;
    bornOnSameDate: boolean;
    index?: number;
}

interface UpdateFødselsdatoer {
    type: SoknadActionKeys.UPDATE_FØDSELSDATOER;
    bornOnSameDate: boolean;
}

// RelasjonTilBarn
interface AddVedlegg {
    type: SoknadActionKeys.ADD_VEDLEGG;
    vedlegg: File[];
}

interface DeleteVedlegg {
    type: SoknadActionKeys.DELETE_VEDLEGG;
    vedlegg: File;
}

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
    periode: Periode;
}

interface EditTidligereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Periode;
    index: number;
}

interface DeleteTidligereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Periode;
}

interface AddSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Periode;
}

interface EditSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Periode;
    index: number;
}

interface DeleteSenereUtenlandsoppholdPeriode {
    type: SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE;
    periode: Periode;
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

export type SoknadActionTypes =
    | AddFødselsdato
    | UpdateFødselsdatoer
    | AddTidligereUtenlandsoppholdPeriode
    | EditTidligereUtenlandsoppholdPeriode
    | DeleteTidligereUtenlandsoppholdPeriode
    | AddSenereUtenlandsoppholdPeriode
    | EditSenereUtenlandsoppholdPeriode
    | DeleteSenereUtenlandsoppholdPeriode
    | AddVedlegg
    | DeleteVedlegg
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
    | ResetSøknad;
