import Barn, { UfodtBarn } from 'app/types/domain/Barn';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import Utenlandsopphold from 'app/types/domain/Utenlandsopphold';
import { fødselsdatoIsSet } from 'util/date/dateUtils';

export const shouldDisplayNextButtonOnStep1 = (barn: Barn) => {
    return (barn as UfodtBarn).terminbekreftelseDato !== undefined || fødselsdatoIsSet(barn);
};

export const shouldDisplayNextButtonOnStep2 = (annenForelder: AnnenForelder) => {
    if (annenForelder.kanIkkeOppgis === true || annenForelder.fnr !== undefined) {
        return true;
    } else {
        return annenForelder.utenlandskFnr === true && annenForelder.bostedsland !== undefined && annenForelder.bostedsland.length > 0;
    }
};

export const shouldDisplayNextButtonOnStep3 = (barn: Barn,  utenlandsopphold: Utenlandsopphold) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return utenlandsopphold.senerePerioder.length > 0 && (fødselsdatoIsSet(barn) || utenlandsopphold.fødselINorge !== undefined);
    } else {
        return utenlandsopphold.fødselINorge !== undefined || (fødselsdatoIsSet(barn) && utenlandsopphold.iNorgeNeste12Mnd !== undefined);
    }
};
