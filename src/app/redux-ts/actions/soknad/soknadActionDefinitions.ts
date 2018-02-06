import { ArbeidSiste12 } from '../../../types/Medlemsskap';

export enum SoknadActionKeys {
    // RelasjonTilBarn
    'SET_ANTALL_BARN' = 'setAntallBarn',
    'SET_FODSELSDATO' = 'setFodselsdato',
    'SET_TERMIN_DATO' = 'setTerminDato',
    'SET_UTSTEDT_DATO' = 'setUtstedtDato',

    // Medlemsskap
    'SET_ARBEID_SISTE_12' = 'setArbeidSiste12',
    'SET_I_NORGE_SISTE_12' = 'setINorgeSiste12',
    'SET_I_NORGE_NESTE_12' = 'setINorgeNeste12',
    'SET_FODSEL_I_NORGE' = 'setFodselINorge'
}

// RelasjonTilBarn
interface SetAntallBarn {
    type: SoknadActionKeys.SET_ANTALL_BARN;
    antallBarn: number;
}

interface SetFodselsdato {
    type: SoknadActionKeys.SET_FODSELSDATO;
    fodselsdato: string;
}

interface SetTerminDato {
    type: SoknadActionKeys.SET_TERMIN_DATO;
    terminDato: string;
}

interface SetUtstedtDato {
    type: SoknadActionKeys.SET_UTSTEDT_DATO;
    utstedtDato: string;
}

// Medlemsskap
interface SetArbeidSiste12 {
    type: SoknadActionKeys.SET_ARBEID_SISTE_12;
    arbeidSiste12: ArbeidSiste12;
}

interface SetFodselINorge {
    type: SoknadActionKeys.SET_FODSEL_I_NORGE;
    fodselINorge: boolean;
}

interface SetINorgeSiste12 {
    type: SoknadActionKeys.SET_I_NORGE_SISTE_12;
    iNorgeSiste12: boolean;
}

interface SetINorgeNeste12 {
    type: SoknadActionKeys.SET_I_NORGE_NESTE_12;
    iNorgeNeste12: boolean;
}

export type SoknadActionTypes =
    | SetAntallBarn
    | SetFodselsdato
    | SetFodselINorge
    | SetTerminDato
    | SetUtstedtDato
    | SetArbeidSiste12
    | SetINorgeSiste12
    | SetINorgeNeste12;
