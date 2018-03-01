import Utenlandsopphold from './Utenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';

type EngangsstonadSoknad = {
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn | UfodtBarn;
};

export default EngangsstonadSoknad;
