import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import AnnenForelder from './AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export interface EngangssoknadSoknadDto {
    type: 'engangsstønad';
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    annenForelder: AnnenForelder;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
};

export default EngangssoknadSoknadDto;
