import { SoknadActionKeys, SoknadActionTypes } from './soknadActionDefinitions';
import { Periode } from '../../../types/domain/Utenlandsopphold';

export function addPeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_PERIODE,
        periode
    };
}

export function editPeriode(periode: Periode, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_PERIODE,
        periode,
        index
    };
}

export function deletePeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.DELETE_PERIODE,
        periode
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

export function setErBarnetFodt(erBarnetFodt?: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ER_BARNET_FODT,
        erBarnetFodt: erBarnetFodt === undefined ? erBarnetFodt : erBarnetFodt === 'before'
    };
}

export function addFodselsdato(fodselsdato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_FODSELSDATO,
        fodselsdato
    };
}

export function setTermindato(termindato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_TERMINDATO,
        termindato
    };
}

export function setTerminbekreftelseDato(terminbekreftelseDato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_TERMINBEKREFTELSE_DATO,
        terminbekreftelseDato
    };
}

export function setJobbetINorgeSiste12Mnd(jobbetINorgeSiste12Mnd: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_JOBBET_I_NORGE_SISTE_12_MND,
        jobbetINorgeSiste12Mnd: jobbetINorgeSiste12Mnd === undefined ? jobbetINorgeSiste12Mnd : jobbetINorgeSiste12Mnd === ''
    };
}

export function setFodselINorge(fodselINorge: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FODSEL_I_NORGE,
        fodselINorge: fodselINorge === undefined ? fodselINorge : fodselINorge === 'norway'
    };
}

export function setINorgeSiste12Mnd(iNorgeSiste12Mnd: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_SISTE_12_MND,
        iNorgeSiste12Mnd: iNorgeSiste12Mnd === undefined ? iNorgeSiste12Mnd : iNorgeSiste12Mnd === 'norway'
    };
}

export function setINorgeNeste12Mnd(iNorgeNeste12Mnd: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_I_NORGE_NESTE_12_MND,
        iNorgeNeste12Mnd: iNorgeNeste12Mnd === undefined ? iNorgeNeste12Mnd : iNorgeNeste12Mnd === 'norway'
    };
}

export default {
    addPeriode,
    editPeriode,
    deletePeriode,
    setAntallBarn,
    setErBarnetFodt,
    addFodselsdato,
    setTermindato,
    setTerminbekreftelseDato,
    setJobbetINorgeSiste12Mnd,
    setFodselINorge,
    setINorgeSiste12Mnd,
    setINorgeNeste12Mnd
};
