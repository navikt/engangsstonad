import Barn, { UfodtBarn, FodtBarn } from 'app/types/domain/Barn';
import { dateFormatsAreValid } from 'util/date/dateUtils';
import Utenlandsopphold from '../types/domain/Utenlandsopphold';
import AnnenForelder from '../types/domain/AnnenForelder';
import { Attachment } from 'storage/attachment/types/Attachment';

export const shouldDisplayNextButtonOnStep1 = (barn: Barn, vedlegg: Attachment[]) => {
    if (!barn.erBarnetFødt) {
        const ufodtBarn = barn as UfodtBarn;
        return (
            ufodtBarn.termindato &&
            ufodtBarn.terminbekreftelseDato &&
            dateFormatsAreValid([ufodtBarn.terminbekreftelseDato, ufodtBarn.termindato]) &&
            barn.antallBarn !== undefined &&
            vedlegg.length > 0
        );
    }
    const fodtBarn = barn as FodtBarn;
    return (fodtBarn.antallBarn !== undefined && dateFormatsAreValid(fodtBarn.fødselsdatoer));
};

export const shouldDisplayNextButtonOnStep2 = (
    annenForelder: AnnenForelder
) => {
    if (
        annenForelder.kanIkkeOppgis === true ||
        annenForelder.fnr !== undefined
    ) {
        return true;
    } else {
        return (
            annenForelder.utenlandskFnr === true &&
            annenForelder.bostedsland !== undefined &&
            annenForelder.bostedsland.length > 0
        );
    }
};

export const iNorgeSiste12MndIsValid = (u: Utenlandsopphold) => {
    return u.iNorgeSiste12Mnd === true || (u.iNorgeSiste12Mnd === false && u.tidligerePerioder.length > 0);
};

export const iNorgeNeste12MndIsValid = (u: Utenlandsopphold) => {
    return u.iNorgeNeste12Mnd === true || (u.iNorgeNeste12Mnd === false && u.senerePerioder.length > 0);
};

export const shouldDisplayNextButtonOnStep3 = (
    barn: Barn,
    utenlandsopphold: Utenlandsopphold
) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return ((dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) || utenlandsopphold.fødselINorge !== undefined)) &&
            iNorgeNeste12MndIsValid(utenlandsopphold) && iNorgeSiste12MndIsValid(utenlandsopphold);
    } else {
        return (
            utenlandsopphold.fødselINorge !== undefined && (dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) &&
                utenlandsopphold.iNorgeNeste12Mnd !== undefined) && iNorgeNeste12MndIsValid(utenlandsopphold) &&
            iNorgeSiste12MndIsValid(utenlandsopphold)
        );
    }
};
