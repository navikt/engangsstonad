import Utenlandsopphold from './Utenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import AnnenForelder from './AnnenForelder';

type EngangsstonadSoknad = {
    type: string;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    annenForelder: AnnenForelder;
};

export default EngangsstonadSoknad;
