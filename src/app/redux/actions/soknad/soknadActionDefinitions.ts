import { Periode } from '../../../types/domain/Utenlandsopphold';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'ADD_FØDSELSDATO' = 'addFødselsdato',
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_ER_BARNET_FODT' = 'setErBarnetFødt',
    'SET_TERMINDATO' = 'setTermindato',
    'SET_TERMINBEKREFTELSE_DATO' = 'setTerminbekreftelseDato',
    'ADD_VEDLEGG' = 'addVedlegg',
    'DELETE_VEDLEGG' = 'deleteVedlegg',

    // Medlemsskap
    'ADD_PERIODE' = 'addPeriode',
    'EDIT_PERIODE' = 'editPeriode',
    'DELETE_PERIODE' = 'deletePeriode',
    'SET_JOBBET_I_NORGE_SISTE_12_MND' = 'setJobbetINorgeSiste12Mnd',
    'SET_I_NORGE_SISTE_12_MND' = 'setINorgeSiste12Mnd',
    'SET_I_NORGE_NESTE_12_MND' = 'setINorgeNeste12Mnd',
    'SET_FODSEL_I_NORGE' = 'setFødselINorge',

    // AnnenForelder
    'SET_ANNEN_FORELDER_NAVN' = 'setAnnenForelderNavn',
    'SET_ANNEN_FORELDER_FNR' = 'setAnnenForelderFnr',
    'SET_ANNEN_FORELDER_UTENLANDSK_FNR' = 'setAnnenForelderUtenlandskFnr',
    'SET_ANNEN_FORELDER_BOSTEDSLAND' = 'setAnnenForelderBostedsland',
    'SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS' = 'setAnnenForelderKanIkkeOppgis'
}

// Barn
interface AddFødselsdato {
    type: SoknadActionKeys.ADD_FØDSELSDATO;
    fødselsdato: string;
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
interface AddPeriode {
    type: SoknadActionKeys.ADD_PERIODE;
    periode: Periode;
}

interface EditPeriode {
    type: SoknadActionKeys.EDIT_PERIODE;
    periode: Periode;
    index: number;
}

interface DeletePeriode {
    type: SoknadActionKeys.DELETE_PERIODE;
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

export type SoknadActionTypes =
    | AddPeriode
    | AddFødselsdato
    | EditPeriode
    | DeletePeriode
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
    | SetAnnenForelderKanIkkeOppgis;
