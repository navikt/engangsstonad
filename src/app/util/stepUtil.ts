import Barn, { UfodtBarn } from 'app/types/domain/Barn';
import { datoIsSet } from 'util/date/dateUtils';
import Utenlandsopphold from '../types/domain/Utenlandsopphold';
import AnnenForelder from '../types/domain/AnnenForelder';

export const shouldDisplayNextButtonOnStep1 = (barn: Barn, vedlegg: File[]) => {
    if (!barn.erBarnetFødt) {
        const b = barn as UfodtBarn;
        return (
            datoIsSet([b.terminbekreftelseDato]) &&
            datoIsSet([b.termindato]) &&
            barn.antallBarn !== undefined &&
            vedlegg.length > 0
        );
    }
    return barn.antallBarn !== undefined && datoIsSet(barn.fødselsdatoer);
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

export const shouldDisplayNextButtonOnStep3 = (
    barn: Barn,
    utenlandsopphold: Utenlandsopphold
) => {
    if (utenlandsopphold.iNorgeNeste12Mnd === false) {
        return (
            utenlandsopphold.senerePerioder.length > 0 &&
            (datoIsSet(barn.fødselsdatoer) ||
                utenlandsopphold.fødselINorge !== undefined)
        );
    } else {
        return (
            utenlandsopphold.fødselINorge !== undefined ||
            (datoIsSet(barn.fødselsdatoer) &&
                utenlandsopphold.iNorgeNeste12Mnd !== undefined)
        );
    }
};
