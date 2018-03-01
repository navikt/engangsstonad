import { Periode } from '../../../types/domain/Utenlandsopphold';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'ADD_FØDSELSDATO' = 'addFødselsdato',
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_ER_BARNET_FODT' = 'setErBarnetFødt',
    'SET_TERMINDATO' = 'setTermindato',
    'SET_TERMINBEKREFTELSE_DATO' = 'setTerminbekreftelseDato',

    // Medlemsskap
    'ADD_PERIODE' = 'addPeriode',
    'EDIT_PERIODE' = 'editPeriode',
    'DELETE_PERIODE' = 'deletePeriode',
    'SET_JOBBET_I_NORGE_SISTE_12_MND' = 'setJobbetINorgeSiste12Mnd',
    'SET_I_NORGE_SISTE_12_MND' = 'setINorgeSiste12Mnd',
    'SET_I_NORGE_NESTE_12_MND' = 'setINorgeNeste12Mnd',
    'SET_FODSEL_I_NORGE' = 'setFødselINorge'
}

// Barn
interface AddFødselsdato {
    type: SoknadActionKeys.ADD_FØDSELSDATO;
    fødselsdato: string;
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

export type SoknadActionTypes =
    | AddPeriode
    | AddFødselsdato
    | EditPeriode
    | DeletePeriode
    | SetAntallBarn
    | SetErBarnetFødt
    | SetFødselINorge
    | SetTermindato
    | SetTerminbekreftelseDato
    | SetJobbetINorgeSiste12Mnd
    | SetINorgeSiste12Mnd
    | SetINorgeNeste12Mnd;
