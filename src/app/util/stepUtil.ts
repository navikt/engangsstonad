import { UfodtBarn } from 'app/types/domain/Barn';
import { fødselsdatoIsSet } from 'util/date/dateUtils';

export const shouldDisplayNextButtonOnStep1 = ({ barn }: any) => {
    return (barn as UfodtBarn).terminbekreftelseDato !== undefined || fødselsdatoIsSet(barn);
};

export const shouldDisplayNextButtonOnStep2 = ({ annenForelder }: any) => {
    if (annenForelder.kanIkkeOppgis === true || annenForelder.fnr !== undefined) {
        return true;
    } else {
        return annenForelder.utenlandskFnr === true && annenForelder.bostedsland !== undefined && annenForelder.bostedsland.length > 0;
    }
};

export const shouldDisplayNextButtonOnStep3 = ({ barn, utenlandsopphold }: any) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return utenlandsopphold.senerePerioder.length > 0 && (fødselsdatoIsSet(barn) || utenlandsopphold.fødselINorge !== undefined);
    } else {
        return utenlandsopphold.fødselINorge !== undefined || (fødselsdatoIsSet(barn) && utenlandsopphold.iNorgeNeste12Mnd !== undefined);
    }
};
