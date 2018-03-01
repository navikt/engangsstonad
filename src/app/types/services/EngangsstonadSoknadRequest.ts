import Utenlandsopphold from '../domain/Utenlandsopphold';
import { FodtBarn, UfodtBarn } from '../domain/Barn';

type EngangsstonadSoknad = {
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn | UfodtBarn;
};

export default EngangsstonadSoknad;
