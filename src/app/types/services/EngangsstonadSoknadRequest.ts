import Medlemsskap from './../domain/Medlemsskap';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from './../domain/RelasjonTilBarn';

type EngangsstonadSoknad = {
    medlemsskap: Medlemsskap;
    relasjonTilBarn?: RelasjonTilFodtBarn | RelasjonTilUfodtBarn;
};

export default EngangsstonadSoknad;
