import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import AnnenForelder from './AnnenForelder';

type EngangsstonadSoknad = {
    type: string;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    annenForelder: AnnenForelder;
};

export default EngangsstonadSoknad;
