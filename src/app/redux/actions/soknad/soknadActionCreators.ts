import { SoknadActionKeys, SoknadActionTypes } from './soknadActionDefinitions';
import { Periode } from '../../../types/domain/Utenlandsopphold';

export function addVedlegg( vedlegg: File[]) {
    return {
        type: SoknadActionKeys.ADD_VEDLEGG,
        vedlegg
    };
}

export function deleteVedlegg( vedlegg: File) {
    return {
        type: SoknadActionKeys.DELETE_VEDLEGG,
        vedlegg
    };
}

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

export function setErBarnetFødt(erBarnetFødt?: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ER_BARNET_FODT,
        erBarnetFødt: erBarnetFødt === undefined ? erBarnetFødt : erBarnetFødt === 'before'
    };
}

export function addFødselsdato(fødselsdato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_FØDSELSDATO,
        fødselsdato
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

export function setFødselINorge(fødselINorge: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FODSEL_I_NORGE,
        fødselINorge: fødselINorge === undefined ? fødselINorge : fødselINorge === 'norway'
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

export function setAnnenForelderNavn(navn: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ANNEN_FORELDER_NAVN,
        navn
    };
}

export function setAnnenForelderFnr(fnr: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ANNEN_FORELDER_FNR,
        fnr
    };
}

export function setAnnenForelderUtenlandskFnr(utenlandskFnr: boolean) {
    return {
        type: SoknadActionKeys.SET_ANNEN_FORELDER_UTENLANDSK_FNR,
        utenlandskFnr
    };
}

export function setAnnenForelderBostedsland(bostedsland: string) {
    return {
        type: SoknadActionKeys.SET_ANNEN_FORELDER_BOSTEDSLAND,
        bostedsland
    };
}

export function setAnnenForelderKanIkkeOppgis(kanIkkeOppgis: boolean) {
    return {
        type: SoknadActionKeys.SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS,
        kanIkkeOppgis
    };
}

export default {
    addPeriode,
    editPeriode,
    deletePeriode,
    addVedlegg,
    deleteVedlegg,
    setAntallBarn,
    setErBarnetFødt,
    addFødselsdato,
    setTermindato,
    setTerminbekreftelseDato,
    setJobbetINorgeSiste12Mnd,
    setFødselINorge,
    setINorgeSiste12Mnd,
    setINorgeNeste12Mnd
};
