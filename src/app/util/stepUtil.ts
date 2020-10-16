import Barn, { UfodtBarn, FodtBarn } from 'app/types/domain/Barn';
import { dateFormatsAreValid } from 'util/date/dateUtils';
import InformasjonOmUtenlandsopphold from '../types/domain/InformasjonOmUtenlandsopphold';
import AnnenForelder from '../types/domain/AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

export const shouldDisplayNextButtonOnStep1 = (barn: Barn) => {
    if (!barn.erBarnetFødt) {
        const ufodtBarn = barn as UfodtBarn;
        return (
            ufodtBarn.termindato &&
            ufodtBarn.terminbekreftelseDato &&
            dateFormatsAreValid([ufodtBarn.termindato]) &&
            barn.antallBarn !== undefined &&
            ufodtBarn.terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0
        );
    }
    const fodtBarn = barn as FodtBarn;
    return fodtBarn.antallBarn !== undefined && dateFormatsAreValid(fodtBarn.fødselsdatoer);
};

export const shouldDisplayNextButtonOnStep2 = (annenForelder: AnnenForelder) => {
    if (annenForelder.kanIkkeOppgis === true || annenForelder.fnr !== undefined) {
        return true;
    } else {
        return (
            annenForelder.utenlandskFnr === true &&
            annenForelder.bostedsland !== undefined &&
            annenForelder.bostedsland.length > 0
        );
    }
};

export const iNorgeSiste12MndIsValid = (u: InformasjonOmUtenlandsopphold) => {
    return u.iNorgeSiste12Mnd === true || (u.iNorgeSiste12Mnd === false && u.tidligereOpphold.length > 0);
};

export const iNorgeNeste12MndIsValid = (u: InformasjonOmUtenlandsopphold) => {
    return u.iNorgeNeste12Mnd === true || (u.iNorgeNeste12Mnd === false && u.senereOpphold.length > 0);
};

export const shouldDisplayNextButtonOnStep3 = (barn: Barn, utenlandsopphold: InformasjonOmUtenlandsopphold) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return (
            dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) &&
            iNorgeNeste12MndIsValid(utenlandsopphold) &&
            iNorgeSiste12MndIsValid(utenlandsopphold)
        );
    } else {
        return (
            dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) &&
            utenlandsopphold.iNorgeNeste12Mnd !== undefined &&
            iNorgeNeste12MndIsValid(utenlandsopphold) &&
            iNorgeSiste12MndIsValid(utenlandsopphold)
        );
    }
};
