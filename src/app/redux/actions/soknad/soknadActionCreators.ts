import {
    DeleteAttachment,
    SoknadActionKeys,
    SoknadActionTypes,
    UploadAttachmentFailed,
    UploadAttachmentSuccess
} from './soknadActionDefinitions';

import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export function addTidligereUtenlandsoppholdPeriode(periode: Utenlandsopphold): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function editTidligereUtenlandsoppholdPeriode(periode: Utenlandsopphold, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode,
        index
    };
}

export function deleteTidligereUtenlandsoppholdPeriode(periode: Utenlandsopphold): SoknadActionTypes {
    return {
        type: SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function addSenereUtenlandsoppholdPeriode(periode: Utenlandsopphold): SoknadActionTypes {
    return {
        type: SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE,
        periode
    };
}

export function editSenereUtenlandsoppholdPeriode(periode: Utenlandsopphold, index: number): SoknadActionTypes {
    return {
        type: SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE,
        periode,
        index
    };
}

export function deleteSenereUtenlandsoppholdPeriode(periode: Utenlandsopphold): SoknadActionTypes {
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
        antallBarn
    };
}

export function setFødselsdato(fødselsdato: string): SoknadActionTypes {
    return {
        type: SoknadActionKeys.SET_FØDSELSDATO,
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

export function resetSøknad() {
    return {
        type: SoknadActionKeys.RESET_SØKNAD
    };
}

const uploadAttachment = (payload: Attachment) => ({
    type: SoknadActionKeys.UPLOAD_ATTACHMENT,
    payload
});

const uploadAttachmentSuccess = (
    attachment: Attachment,
    url: string,
    uuid: string
): UploadAttachmentSuccess => ({
    type: SoknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS,
    attachment,
    url,
    uuid
});

const uploadAttachmentFailed = (
    error: string,
    attachment: Attachment
): UploadAttachmentFailed => ({
    type: SoknadActionKeys.UPLOAD_ATTACHMENT_FAILED,
    error,
    attachment
});

const deleteAttachment = (attachment: Attachment): DeleteAttachment => ({
    type: SoknadActionKeys.DELETE_ATTACHMENT,
    attachment
});

export default {
    addTidligereUtenlandsoppholdPeriode,
    editTidligereUtenlandsoppholdPeriode,
    deleteTidligereUtenlandsoppholdPeriode,
    addSenereUtenlandsoppholdPeriode,
    editSenereUtenlandsoppholdPeriode,
    deleteSenereUtenlandsoppholdPeriode,
    setAntallBarn,
    setErBarnetFødt,
    setFødselsdato,
    setTermindato,
    setTerminbekreftelseDato,
    setJobbetINorgeSiste12Mnd,
    setFødselINorge,
    setINorgeSiste12Mnd,
    setINorgeNeste12Mnd,
    resetSøknad,
    uploadAttachment,
    uploadAttachmentSuccess,
    uploadAttachmentFailed,
    deleteAttachment
};
