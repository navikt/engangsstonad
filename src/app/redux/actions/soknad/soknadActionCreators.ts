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

export function addTidligereUtenlandsoppholdPeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function editTidligereUtenlandsoppholdPeriode(periode: Periode, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode,
        index
    };
}

export function deleteTidligereUtenlandsoppholdPeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function addSenereUtenlandsoppholdPeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function editSenereUtenlandsoppholdPeriode(periode: Periode, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE,
        periode,
        index
    };
}

export function deleteSenereUtenlandsoppholdPeriode(periode: Periode): SoknadActionTypes {
    return {
        type: SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function setErBarnetFødt(erBarnetFødt?: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ER_BARNET_FODT,
        erBarnetFødt: erBarnetFødt === undefined ? erBarnetFødt : erBarnetFødt === 'before'
    };
}

export function setAntallBarn(antallBarn: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_ANTALL_BARN,
        antallBarn: antallBarn
    };
}

export function editFødselsdato(fødselsdato: string, bornOnSameDate: boolean, index?: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_FØDSELSDATO,
        fødselsdato,
        bornOnSameDate,
        index
    };
}

export function updateFødselsdatoer(bornOnSameDate: boolean): SoknadActionTypes {
    return {
        type: SoknadActionKeys.UPDATE_FØDSELSDATOER,
        bornOnSameDate
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
    addTidligereUtenlandsoppholdPeriode,
    editTidligereUtenlandsoppholdPeriode,
    deleteTidligereUtenlandsoppholdPeriode,
    addSenereUtenlandsoppholdPeriode,
    editSenereUtenlandsoppholdPeriode,
    deleteSenereUtenlandsoppholdPeriode,
    addVedlegg,
    deleteVedlegg,
    setAntallBarn,
    setErBarnetFødt,
    editFødselsdato,
    updateFødselsdatoer,
    setTermindato,
    setTerminbekreftelseDato,
    setJobbetINorgeSiste12Mnd,
    setFødselINorge,
    setINorgeSiste12Mnd,
    setINorgeNeste12Mnd
};
