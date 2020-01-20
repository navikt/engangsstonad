import Barn, { FodtBarn } from 'app/types/domain/Barn';
import { dateFormatsAreValid } from 'util/date/dateUtils';
import InformasjonOmUtenlandsopphold from '../types/domain/InformasjonOmUtenlandsopphold';

export const iNorgeSiste12MndIsValid = (u: InformasjonOmUtenlandsopphold) => {
    return u.iNorgeSiste12Mnd === true || (u.iNorgeSiste12Mnd === false && u.tidligereOpphold.length > 0);
};

export const iNorgeNeste12MndIsValid = (u: InformasjonOmUtenlandsopphold) => {
    return u.iNorgeNeste12Mnd === true || (u.iNorgeNeste12Mnd === false && u.senereOpphold.length > 0);
};

export const shouldDisplayNextButtonOnStep3 = (
    barn: Barn,
    utenlandsopphold: InformasjonOmUtenlandsopphold
) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) &&
            iNorgeNeste12MndIsValid(utenlandsopphold) && iNorgeSiste12MndIsValid(utenlandsopphold);
    } else {
        return ((dateFormatsAreValid((barn as FodtBarn).fødselsdatoer) &&
                utenlandsopphold.iNorgeNeste12Mnd !== undefined) && iNorgeNeste12MndIsValid(utenlandsopphold) &&
            iNorgeSiste12MndIsValid(utenlandsopphold)
        );
    }
};
