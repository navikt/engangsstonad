import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import AnnenForelder from './AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface EngangsstonadSoknad {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    annenForelder: AnnenForelder;
    vedlegg?: Attachment[];
};

export interface EngangssoknadSoknadDto {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    annenForelder: AnnenForelder;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
};


export default EngangsstonadSoknad;
