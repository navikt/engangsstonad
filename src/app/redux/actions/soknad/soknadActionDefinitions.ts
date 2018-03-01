import { Periode } from '../../../types/domain/Utenlandsopphold';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'ADD_FODSELSDATO' = 'addFodselsdato',
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_ER_BARNET_FODT' = 'setErBarnetFodt',
    'SET_TERMINDATO' = 'setTermindato',
    'SET_TERMINBEKREFTELSE_DATO' = 'setTerminbekreftelseDato',

    // Medlemsskap
    'ADD_PERIODE' = 'addPeriode',
    'EDIT_PERIODE' = 'editPeriode',
    'DELETE_PERIODE' = 'deletePeriode',
    'SET_JOBBET_I_NORGE_SISTE_12_MND' = 'setJobbetINorgeSiste12Mnd',
    'SET_I_NORGE_SISTE_12_MND' = 'setINorgeSiste12Mnd',
    'SET_I_NORGE_NESTE_12_MND' = 'setINorgeNeste12Mnd',
    'SET_FODSEL_I_NORGE' = 'setFodselINorge'
}

// Barn
interface AddFodselsdato {
    type: SoknadActionKeys.ADD_FODSELSDATO;
    fodselsdato: string;
}

interface SetAntallBarn {
    type: SoknadActionKeys.SET_ANTALL_BARN;
    antallBarn: number;
}

interface SetErBarnetFodt {
    type: SoknadActionKeys.SET_ER_BARNET_FODT;
    erBarnetFodt?: boolean;
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

interface SetFodselINorge {
    type: SoknadActionKeys.SET_FODSEL_I_NORGE;
    fodselINorge: boolean;
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
    | AddFodselsdato
    | EditPeriode
    | DeletePeriode
    | SetAntallBarn
    | SetErBarnetFodt
    | SetFodselINorge
    | SetTermindato
    | SetTerminbekreftelseDato
    | SetJobbetINorgeSiste12Mnd
    | SetINorgeSiste12Mnd
    | SetINorgeNeste12Mnd;
