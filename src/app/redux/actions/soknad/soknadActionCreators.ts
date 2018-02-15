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

export function setBarnErFodt(barnErFodt?: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_BARN_ER_FODT,
        barnErFodt: barnErFodt === undefined ? barnErFodt : barnErFodt === 'before'
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

export function setFodselINorge(fodselINorge: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FODSEL_I_NORGE,
        fodselINorge: fodselINorge === undefined ? fodselINorge : fodselINorge === 'norway'
    };
}

export function setINorgeSiste12(iNorgeSiste12: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_SISTE_12,
        iNorgeSiste12: iNorgeSiste12 === undefined ? iNorgeSiste12 : iNorgeSiste12 === 'norway'
    };
}

export function setINorgeNeste12(iNorgeNeste12: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_NESTE_12,
        iNorgeNeste12: iNorgeNeste12 === undefined ? iNorgeNeste12 : iNorgeNeste12 === 'norway'
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
