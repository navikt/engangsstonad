import Utenlandsopphold from './Utenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import AnnenForelder from './AnnenForelder';

type EngangsstonadSoknad = {
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    vedlegg: File[];
    annenForelder: AnnenForelder;
};

export default EngangsstonadSoknad;
