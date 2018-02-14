import { SoknadActionKeys, SoknadActionTypes } from './soknadActionDefinitions';
import { ArbeidSiste12, Utenlandsopphold } from '../../../types/domain/Medlemsskap';

export function addUtenlandsopphold(utenlandsopphold: Utenlandsopphold): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_UTENLANDSOPPHOLD,
        utenlandsopphold
    };
}

export function editUtenlandsopphold(utenlandsopphold: Utenlandsopphold, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_UTENLANDSOPPHOLD,
        utenlandsopphold,
        index
    };
}

export function deleteUtenlandsopphold(utenlandsopphold: Utenlandsopphold): SoknadActionTypes {
    return {
        type: SoknadActionKeys.DELETE_UTENLANDSOPPHOLD,
        utenlandsopphold
    };
}

export function setAntallBarn(antallBarn: string): SoknadActionTypes {
    let numerical = 1;
    if (antallBarn === 'tvillinger') {
        numerical = 2;
    } else if (antallBarn === 'flere') {
        numerical = 3;
    }

    return {
        type: SoknadActionKeys.SET_ANTALL_BARN,
        antallBarn: numerical
    };
}

export function setBarnErFodt(barnErFodt?: boolean): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_BARN_ER_FODT,
        barnErFodt
    };
}

export function setFodselsdato(fodselsdato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FODSELSDATO,
        fodselsdato
    };
}

export function setTerminDato(terminDato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_TERMIN_DATO,
        terminDato
    };
}

export function setUtstedtDato(utstedtDato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_UTSTEDT_DATO,
        utstedtDato
    };
}

export function setArbeidSiste12(arbeidSiste12: ArbeidSiste12): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ARBEID_SISTE_12,
        arbeidSiste12
    };
}

export function setFodselINorge(fodselINorge: boolean): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FODSEL_I_NORGE,
        fodselINorge
    };
}

export function setINorgeSiste12(iNorgeSiste12: boolean): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_SISTE_12,
        iNorgeSiste12
    };
}

export function setINorgeNeste12(iNorgeNeste12: boolean): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_NESTE_12,
        iNorgeNeste12
    };
}

export default {
    addUtenlandsopphold,
    editUtenlandsopphold,
    deleteUtenlandsopphold,
    setAntallBarn,
    setBarnErFodt,
    setFodselsdato,
    setTerminDato,
    setUtstedtDato,
    setArbeidSiste12,
    setFodselINorge,
    setINorgeSiste12,
    setINorgeNeste12
};
