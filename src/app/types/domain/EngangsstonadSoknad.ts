import Medlemsskap from './Medlemsskap';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from './RelasjonTilBarn';

type EngangsstonadSoknad = {
    medlemsskap: Medlemsskap;
    relasjonTilBarn?: RelasjonTilFodtBarn | RelasjonTilUfodtBarn;
    barnErFodt?: boolean;
};

export default EngangsstonadSoknad;
